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
        const normalUserToken = decode?.isAdmin !== 'admin' ? 'user' : '';

        req.user = await User.findOne({
            _id: decode._id,
            username: decode.username,
            isAdmin: normalUserToken,
        }).select('-password');

        next();
    } catch (error) {
        console.log(error);
        return res.status(401).json({ message: 'Not authorized' });
    }
};

const isAdmin = async (req, res, next) => {
    const token = getTokenFromHeader(req);

    try {
        const decode = await verifyToken(token);
        const adminToken = decode?.isAdmin === 'admin' ? 'admin' : '';

        req.user = await User.findOne({
            _id: decode._id,
            username: decode.username,
            isAdmin: adminToken,
        }).select('-password');

        next();
    } catch (error) {
        console.log(error);
        return res.status(403).json({ message: "You Don't Have Permission, Forbiden" });
    }
};


module.exports = { protect, isAdmin };