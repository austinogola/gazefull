const express = require('express');
const crypto = require('crypto');
const nodemailer = require('nodemailer');
const passport = require('passport');
const jwt_decode = require("jwt-decode");
const { jwtDecode } =jwt_decode
const jwt = require('jsonwebtoken');
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const Member = require('../models/Member');
require("dotenv").config();



passport.use(new GoogleStrategy({
    clientID: process.env.google_client_id,
    clientSecret: process.env.google_client_secret,
    callbackURL: "/auth/google/callback"
  },
  async (accessToken, refreshToken, profile, done) => {
    try {
      let member = await Member.findOne({ googleId: profile.id });
      if (!member) {
        member = new Member({
          googleId: profile.id,
          username: profile.displayName,
          email: profile.emails[0].value
        });
        await member.save();
      }
      return done(null, member);
    } catch (err) {
      return done(err, null);
    }
  }
));
const Account = require('../models/Account');
const router = express.Router();
const bcrypt = require('bcryptjs');

// process.env.jwtSecret
const generateToken = async(member) => {
    // console.log(process.env.jwtSecret)
    return new Promise(async(resolve,reject)=>{
        console.log(member)
        const maxAge = 24 *15 * 60 * 60;
    const token=await jwt.sign(
            { id: member._id, email: member.email },
            'qwertyuiopasdfghjklzxcvbnm',
            {
                expiresIn:maxAge
            }
        )
     resolve(token)
    })
    
}


// Middleware to authenticate using the JWT token from cookies
const authenticateJWT = (req, res, next) => {
    // const token = req.cookies.gg_token;
    const token=req.headers.authorization
    if (!token) return res.status(401).json({ message: 'Unauthorized, token missing' });


// console.log(process.env.jwtSecret)
// console.log(token)
    jwt.verify(token, 'qwertyuiopasdfghjklzxcvbnm', (err, user) => {
        console.log(user)
        // console.log(err)
        // console.log(user)
        if (err) return res.status(403).json({ message: 'Invalid token' });
        req.user = user; // Add the decoded user info to the request object
        next();
    });
};

// Sign Up and Automatically Log In
router.post('/signup', async (req, res, next) => {
    try {
        const { email, username, password,phone} = req.body;
        // console.log(email, username, password)

        let existingEmailUser = await Member.findOne({ email });

        console.log(existingEmailUser)
        if(existingEmailUser && existingEmailUser.isEmailVerified===true){
            return res.status(400).json({ 
                message: 'User with this email or username already exists',
                status: 'fail'
            });
        }
        let existingUsername = await Member.findOne({ $or: [{ email }, { username }] });
        // if (existingUsername) {
        //     return res.status(400).json({ 
        //         message: 'User with this email or username already exists',
        //         status: 'fail'
        //     });
        // }

        const verificationCode = generateVerificationCode();

        // Create a new member
        const newMember = new Member({ 
            email, 
            username, 
            password,
            phone,
            emailVerificationCode: verificationCode,
            emailVerificationExpires: Date.now() + 30 * 60 * 1000 // 15 minutes
        });

        const transporter = nodemailer.createTransport({
            // service: 'Gmail',
            host:'mail.spacemail.com',
            port: 465,
            secure:true,
            name:'info@gazeguard.io',
            auth: {
                user: process.env.sender_Email,
                pass:process.env.email_pswd 
            }
        });

        // console.log(transporter);
        
        // http://${req.headers.host}/reset-password/${resetToken}\n\n
        const mailOptions = {
            to: email,
            from: 'info@gazeguard.io',
            subject: 'Email Verification for Gaze Guard',
            text: `Your verification code is: ${verificationCode}\n\n` +
                  `This code will expire in 30 minutes.\n` +
                  `If you did not sign up, please ignore this email.`
        };

        await transporter.sendMail(mailOptions);

        // Save the new member
        if(!existingUsername){
            await newMember.save();
        }else{
           
            let pwdHash=await bcrypt.hash(password, 10)
            existingUsername= await Member.findOneAndUpdate(
                { email }, 
                { 
                    emailVerificationCode: verificationCode,
                    emailVerificationExpires:Date.now() + 30 * 60 * 1000 ,
                    username,password:pwdHash
                 }, 
                { new: true } // Returns the updated document
              );
        }

        console.log('NEW',existingUsername)
        

        res.status(200).json({ message: 'User created . Confirm',status:"success" });

        
       


        return
        // const newMember = new Member({ email, username, password,phone });
        await newMember.save();
        console.log(newMember)

        let newAccount;
        try {
            newAccount = new Account({ memberId: newMember._id, username, password, plan: 'Free', usage: [] });
            await newAccount.save();
        } catch (err) {
            console.error('Error creating account:', err);
            // Retry account creation
            newAccount = new Account({ memberId: newMember._id, username, password, plan: 'Free', usage: [] });
            await newAccount.save();
        }

        // Automatically log in the user
        req.login(newMember, async err => {
            if (err) {
                return next(err);
            }
            

            // Generate JWT
            const token = await generateToken(newMember);
            console.log('the token',token)

            // Set token in cookies
            // res.cookie('gg_token', token, { httpOnly: true });

            // Send response
            res.status(200).json({ message: 'User created and logged in', gg_token:token,status:"success" });
        });
    } catch (err) {
        console.log(err)
        res.status(400).json({ error: err.message });
    }
});

router.post('/confirm-code', async(req, res, next) => {
    const { email, code} = req.body;

    if(!email){
        return res.status(401).json({ message: 'No email with the code',status:'fail' });
    }
    if(!code){
        return res.status(401).json({ message: 'No code provided',status:'fail' });
    }

    const existingEmailUser = await Member.findOne({ email });

    if(!existingEmailUser){
        return res.status(401).json({ message: 'The email provided is invalid',status:'fail' });
    }

    if(existingEmailUser.emailVerificationCode!=code){
        return res.status(401).json({ message: 'Invalid code provided',status:'fail' });
    }else{
        if(Date.now()>existingEmailUser.emailVerificationExpires){
            return res.status(401).json({ message: 'Code expired. Please try again',status:'fail' }); 
        }

        let newAccount;
        try {
            newAccount = new Account({ memberId: existingEmailUser._id, plan: 'Free', usage: [],payments:[]  });
            await newAccount.save();
        } catch (err) {
            console.error('Error creating account:', err);
            // Retry account creation
            newAccount = new Account({ memberId: existingEmailUser._id,  plan: 'Free', usage: [],payments:[] });
            existingEmailUser.isEmailVerified=false
            await newAccount.save();
        }finally{
            await Member.findOneAndUpdate(
                { email }, 
                { 
                    isEmailVerified:true
                 }, 
                { new: true } // Returns the updated document
              );
            req.login(existingEmailUser, async err => {
                if (err) {
                    return next(err);
                }
                // Generate JWT
                const token = await generateToken(existingEmailUser)
    
                // Set token in cookies
                // res.cookie('gg_token', token, { httpOnly: true });
    
                // Send response
                res.status(200).json({ message: 'User created and logged in', gg_token:token,status:"success" });
            });
        }


    }

   
})

// Log In and Send Token
router.post('/login', async(req, res, next) => {
    passport.authenticate('local', async(err, member, info) => {
        if (err) return next(err);
        if (!member) return res.status(401).json({ message: info.message,status:'fail' });

        req.login(member, async(err) => {
            if (err) return next(err);

            console.log(member)
            if(!member.isEmailVerified){
                return res.status(401).json({ message: 'User is not verified',status:'fail' });
            }
            // Generate JWT
            const token = await generateToken(member);
            console.log('the tokennn',token)

            // Set token in cookies
            // res.cookie('auth_token', token, { httpOnly: true });

            // Send response
            res.status(200).json({ message: 'Logged in successfully', gg_token:token,status:"success" });
        });
    })(req, res, next);
});

router.get('/auth/google', passport.authenticate('google', { scope: ['profile', 'email'] }));

router.get('/auth/google/callback', 
  passport.authenticate('google', { failureRedirect: '/login' }),
  (req, res) => {
    // Successful authentication, redirect home.
    res.redirect('/');
  }
);

// Log Out
router.post('/logout', (req, res) => {
    res.clearCookie('auth_token');  // Clear the auth cookie
    req.logout();
    res.json({ message: 'Logged out successfully' });
});

const generateVerificationCode = () => {
    return Math.floor(100000 + Math.random() * 900000).toString();
};

const plans_objects={
    "free":{"images":60,"video":5},
    "Free":{"images":60,"video":5},
    "Premium":{"images":"unlimited","video":200},
    "premium":{"images":"unlimited","video":200},
    "Deluxe":{"images":'unlimited',"video":'unlimited'},
    "deluxe":{"images":'unlimited',"video":'unlimited'}
    }

    const PLANS = {
       Free: {
        name: "Free",
        price: 0,
        images: "60 Minutes/Day",
        video: "5 Minutes/Day",
        id: "price_1QBKaTP0Bii0CHodzg28tB1H",
        test_link:'https://buy.stripe.com/test_fZebJz2A65fn0tG8wB',
        link:'https://buy.stripe.com/bIY3fk3hI4R16mkeUW'
    },
    Premium: {
        name: "Premium",
        price: 6.0,
        images: "Unlimited Minutes/Day",
        video: "45 Minutes/Day",
        id: "price_1Q7H9OP0Bii0CHodYPqqqEmd",
        test_link:"https://buy.stripe.com/test_8wM7tjcaGgY56S48wC",
        link:'https://buy.stripe.com/14k4jo3hI4R14ecbII'
    },
    Deluxe: {
        name: "Deluxe",
        price: 9.9,
        images: "Unlimited Minutes/Day",
        video: "Unlimited Minutes/Day",
        id: "price_1Q7HBFP0Bii0CHodsHrXHIEt",
        test_link:"https://buy.stripe.com/test_5kA9Bra2ydLT5O04gn",
        link:'https://buy.stripe.com/9AQ9DI19A4R1h0Y9AB'
    },
      };

function getMemberUsageRemnants(the_account) {
    const now = new Date();
    const startOfToday = new Date(now.getFullYear(), now.getMonth(), now.getDate()).getTime();
    const startOfTomorrow = new Date(now.getFullYear(), now.getMonth(), now.getDate() + 1).getTime();

    // const accountData = the_account.toObject();  // Assuming we're working with Mongoose, convert document to JS object
    
    const plan = the_account.plan;
    const usage = the_account.usage;
    // console.log(the_account)
    console.log(plan,the_account.plan)

    const maxImages = plans_objects[plan]["images"];
    const maxMinutes = plans_objects[plan]["video"];

    let remainingImages = 'unlimited';
    let remainingMinutes = 'unlimited';

    if (typeof maxImages === 'number') {
        // Filter for today's images
        // console.log('allimages',usage)
        const imagesToday = usage.filter(obj => {
            return obj.time_added >= startOfToday && obj.time_added < startOfTomorrow && obj.type === 'image';
        });
        // console.log('imagesToday',imagesToday)
        // console.log('startOfToday',startOfToday,'startOfTomorrow',startOfTomorrow)
        remainingImages = maxImages - imagesToday.length;
    }

    if (typeof maxMinutes === 'number') {
        // Filter for today's videos
        const videosToday = usage.filter(obj => {
            return obj.time_added >= startOfToday && obj.time_added < startOfTomorrow && obj.type === 'video';
        });

        const minutesToday = videosToday.reduce((sum, obj) => sum + obj.minutes, 0);
        remainingMinutes = maxMinutes - minutesToday;
    }

    return {
        max_minutes: maxMinutes,
        remaining_minutes: remainingMinutes,
        max_images: maxImages,
        remaining_images: remainingImages
    };
}

router.get('/api/config', authenticateJWT, async (req, res) => {
    console.log('checking config')
    const account = await Account.findOne({ memberId: req.user.id });
    // console.log(account)
    if (!account) {
        return res.status(404).json({ message: 'Account not found' });
    }

    let config_data=getMemberUsageRemnants(account)
    return res.status(200).json({'status': 'success', 'data':config_data,plan:account.plan})
})

router.post('/api/usage', authenticateJWT, async (req, res) => {
    try {
        const { type,gg_src,time } = req.body; // The new usage data sent in the request

        // Find the account based on the logged-in member's ID
        const account = await Account.findOne({ memberId: req.user.id });
        if (!account) {
            return res.status(404).json({ message: 'Account not found' });
        }

        if(!type){
            return res.status(400).json({ message: 'Type missing'});
        }

        console.log(type)
        const time_added=new Date().getTime()

        if(type=='image'){
           account.usage.push({type,time_added}); 
           await account.save();
        }else{
            const prev_obj = account.usage.find(obj => obj.type === 'video' && obj.gg_src === gg_src);
            // console.log(prev_obj)
            if (!prev_obj) {
                account.usage.push({
                    time_added: time_added,  // You can replace this with the appropriate time value
                    type,gg_src,
                    minutes: time
                });
                await account.save();
            } else {
                prev_obj.minutes += time;
                await account.save();
            }
        }
        let config_data=getMemberUsageRemnants(account)

        // Add the new usage data to the account's usage array
        // 
        // 

        res.status(200).json({'status': 'success', 'message': 'Updated',"new_state":config_data});
    } catch (err) {
        res.status(500).json({ error: 'An error occurred while updating usage', details: err.message });
    }
});

router.post('/request-password-reset', async (req, res) => {
    const { email } = req.body;

    console.log(email)
    if (!email) {
        return res.status(400).json({ message: 'Email is required',status:'fail' });
    }

    try {
        const member = await Member.findOne({ email });
        if (!member) {
            return res.status(404).json({ message: 'User not found' ,status:'fail'});
        }

        const resetToken = crypto.randomBytes(32).toString('hex');
        member.resetPasswordToken = resetToken;
        member.resetPasswordExpires = Date.now() + 3600 * 1000; // 1 hour
        await member.save();

        const transporter = nodemailer.createTransport({
            // service: 'Gmail',
            host:'mail.spacemail.com',
            port: 465,
            secure:true,
            name:'info@gazeguard.io',
            auth: {
                user: process.env.sender_Email,
                pass:process.env.email_pswd 
            }
        });

        // console.log(transporter);
        
        // http://${req.headers.host}/reset-password/${resetToken}\n\n
        const mailOptions = {
            to: email,
            from: 'info@gazeguard.io',
            subject: 'GazeGuard Password Reset',
            text: `You are receiving this because you (or someone else) have requested the reset of the password for your account.\n\n
            Please click on the following link, or paste this into your browser to complete the process:\n
            ${process.env.web_app_host}/reset-password?token=${resetToken}\n
           
            If you did not request this, please ignore this email and your password will remain unchanged.\n`,
        };

        // console.log(mailOptions);
        transporter.sendMail(mailOptions, (err) => {
          console.log(err)
            if (err) {
                return res.status(500).json({ message: 'Error sending email', error: err.message,status:'fail'  });
            }
            res.status(200).json({ message: 'Password reset email sent. Check your email',status:'success' });
        });
    } catch (err) {
        res.status(500).json({ message: 'Error processing request', error: err.message,status:'fail'  });
    }
});

router.post('/reset-password/:token', async (req, res) => {
    const { newPassword } = req.body;
    const { token } = req.params;

    if (!newPassword) {
        return res.status(400).json({ message: 'New password is required',status:'fail' });
    }

    try {
        const member = await Member.findOne({
            resetPasswordToken: token,
            resetPasswordExpires: { $gt: Date.now() },
        });

        if (!member) {
            return res.status(400).json({ message: 'Password reset token is invalid or has expired',status:'fail' });
        }

        member.password = newPassword; // You should hash the password before saving
        member.resetPasswordToken = undefined;
        member.resetPasswordExpires = undefined;
        await member.save();

        res.status(200).json({ message: 'Password has been reset. Login to proceed' ,status:'success'});
    } catch (err) {
        res.status(500).json({ message: 'Error resetting password', error: err.message,status:'fail' });
    }
});

const getGoogleOAuthTokens=(code,webHost)=>{
    // console.log(webHost)
    const url='https://oauth2.googleapis.com/token'
    const vals={
        client_id:process.env.google_client_id,
        client_secret:process.env.google_client_secret,
        redirect_uri:`${process.env.web_app_host}/oauth-google`,
        grant_type:"authorization_code",
        code
    }

    return new Promise(async(resolve,reject)=>{
            fetch(url,{
                method:'POST',
                headers:{"Content-Type":"application/json"},
                body:JSON.stringify(vals)
            })
            .then(async res=>{
                let resp=await res.json()
                // console.log(resp)
                const {access_token}=resp
                if(access_token){
                    const {access_token,refresh_token,scope,token_type,id_token}=resp
                    resolve({access_token,refresh_token,scope,token_type,id_token,success:true})
                }else{
                    resolve({error:true})
                }
    
            }) 
    })  
}

router.post('/google',async(req,res)=>{
    const {code,scope,webHost}=req.body
    console.log(code,scope,webHost)

    let ans=await getGoogleOAuthTokens(code,webHost)
    console.log(ans)
    if(ans.error){
        return res.status(500).json({error:true,message:"Please try again",status:'fail'})
    }else{
        const {id_token}=ans
        const googleUser=jwtDecode(id_token)
        
        console.log(googleUser)
        const {email,email_verified,given_name,family_name,picture}=googleUser

        const existingEmailUser = await Member.findOne({ email });

        console.log('fffff',existingEmailUser)
        let token
        try{
            if(!existingEmailUser){
                const newMember = new Member({ 
                    email
                });
                await newMember.save();
                console.log('jjjjj',newMember)
                // const existingEmailUser = await Member.findOne({ email });
    
                let newAccount = new Account({ memberId: newMember._id, plan: 'Free', usage: [],payments: [] });
                await newAccount.save();
    
                console.log('AAAA')
                token = await generateToken(newMember);
    
                // return res.status(401).json({ message: 'The email provided is invalid',status:'fail' });
            }else{
                console.log('BBBB')
                token = await generateToken(existingEmailUser);
            }
        }
        catch (err) {
            // return done(err, null);
            let existingEmailUser2 = await Member.findOne({ email });
            console.log('sfdsfs',existingEmailUser2)
            let newAccount = new Account({ memberId: existingEmailUser2._id, plan: 'Free', usage: [],payments: [] });
            await newAccount.save();

            console.log('DDDD')
            token = await generateToken(existingEmailUser2);
        }
        

        res.status(200).json({ message: 'Logged in successfully', gg_token:token,status:"success" })
        // res.status(200).json({error:false,token,status:'success'})
    }
})

module.exports = router;
