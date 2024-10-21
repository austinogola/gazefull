const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const Member = require('../models/Member');

passport.use(new LocalStrategy({
    usernameField: 'email'
}, async (email, password, done) => {
    try {
        const member = await Member.findOne({ email });
        if (!member) return done(null, false, { message: 'No user with that email' });
        const isMatch = await member.comparePassword(password);
        if (isMatch) return done(null, member);
        return done(null, false, { message: 'Password incorrect' });
    } catch (err) {
        return done(err);
    }
}));

passport.serializeUser((member, done) => {
    done(null, member.id);
});

passport.deserializeUser(async (id, done) => {
    try {
        const member = await Member.findById(id);
        done(null, member);
    } catch (err) {
        done(err);
    }
});
