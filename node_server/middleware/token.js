const passport = require('passport');
const jwt = require('jsonwebtoken');
const Member = require('../models/Member');
const Account = require('../models/Account');


const generateToken = async(member) => {
    // console.log(process.env.jwtSecret)
    return new Promise(async(resolve,reject)=>{
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
    
};

const authenticateJWT = (req, res, next) => {
    // const token = req.cookies.gg_token;
    // const token=req.headers.authorization
    const token = req.header('Authorization').replace('Bearer ', '');
    if (!token) return res.status(401).json({ message: 'Unauthorized, token missing' });


// console.log(process.env.jwtSecret)
// console.log(token)
    jwt.verify(token, 'qwertyuiopasdfghjklzxcvbnm', (err, user) => {
        // console.log(user)
        // console.log(err)
        // console.log(user)
        if (err) return res.status(403).json({ message: 'Invalid token' });
        req.user = user; // Add the decoded user info to the request object
        next();
    });
};

module.exports = { authenticateJWT, generateToken };

