const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const memberSchema = new mongoose.Schema({
    email: { type: String, required: true},
    password: { type: String,  },
    isAdmin: { type: Boolean, default: false } ,
    resetPasswordToken:{type:String},
    resetPasswordExpires:{type:Number},
    phone:{type:String},
    emailVerificationCode: String,
    emailVerificationExpires: Number,
    isEmailVerified: {
        type: Boolean,
        default: false
    }
});

memberSchema.pre('save', async function(next) {
    if (!this.isModified('password')) return next();
    this.password = await bcrypt.hash(this.password, 10);
    next();
});

memberSchema.methods.comparePassword = function(password) {
    return bcrypt.compare(password, this.password);
};

const Member = mongoose.model('Member', memberSchema);
module.exports = Member;
