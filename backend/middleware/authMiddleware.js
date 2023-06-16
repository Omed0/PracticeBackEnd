const jwt = require('jsonwebtoken')
const User = require('../models/user')


const getTokenFromHeader = (req) => {
    const authHeader = req.headers.authorization || req.headers.Authorization;
    try {
        if (authHeader?.startsWith('Bearer')) {
            return authHeader.split(' ')[1];
        }
    } catch (error) {
        return res.status(401).json({ message: 'Not authorized, no token' });
    }
    return null;
};

const verifyToken = async (token) => {
    try {
        const decode = jwt.verify(token, process.env.JWT_SECRET);
        return decode;
    } catch (error) {
        throw new Error('Not authorized, token failed');
    }
};

const protect = async (req, res, next) => {
    const token = getTokenFromHeader(req);

    try {
        const decode = await verifyToken(token);

        req.user = await User.findOne({
            _id: decode._id,
        }).select('-password');

        if (req.user.isAdmin === 'user' || 'admin') next();
        else return res.status(401).json({ message: 'Not authorized' });

    } catch (error) {
        console.log(error);
        throw new Error('Not authorized, token failed');
    }
};

const isAdmin = async (req, res, next) => {
    const token = getTokenFromHeader(req);

    try {
        const decode = await verifyToken(token);

        req.user = await User.findOne({
            _id: decode._id,
        }).select('-password');

        if (req.user.isAdmin === 'admin') next();
        else return res.status(403).json({ message: "You Don't Have Permission, Forbiden" });

    } catch (error) {
        console.log(error);
        throw new Error('Not authorized, token failed');
    }
};


module.exports = { protect, isAdmin };