const jwt = require('jsonwebtoken');
const Member = require('../models/Member');

const authenticateAdminJWT = (req, res, next) => {
    const token = req.cookies.auth_token;  // Assuming the token is stored in cookies
    if (!token) return res.status(401).json({ message: 'Unauthorized, token missing' });

    jwt.verify(token, process.env.JWT_SECRET, async (err, decoded) => {
        if (err) return res.status(403).json({ message: 'Invalid token' });

        const member = await Member.findById(decoded.id);
        if (!member || !member.isAdmin) {
            return res.status(403).json({ message: 'Access denied. Admins only.' });
        }

        req.member = member;  // Save member info to request
        next();
    });
};

module.exports = authenticateAdminJWT;
