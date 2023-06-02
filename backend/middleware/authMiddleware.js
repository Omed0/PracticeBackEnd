const jwt = require('jsonwebtoken')
const User = require('../models/user')


const protect = async (req, res, next) => {
    let token = null
    //i want create token and authorization for specific user like admin

    if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
        try {
            // get token header

            token = req.headers.authorization.split(' ')[1]

            //verify token
            const decode = jwt.verify(token, process.env.JWT_SECRET)

            //Get user from token
            req.user = await User.findOne({
                _id: decode._id,
                author: decode.author,
                email: decode.email,
                isAdmin: decode.isAdmin,
            }).select('-password')

            next()
        } catch (error) {
            console.log(error)
            res.status(401).json({ message: 'Not authorized' })
            // throw new Error('Not authorized, token failed')
        }
    }

    if (!token) {
        res.status(401).json({ message: 'Not authorized, no token' })
        // throw new Error('Not authorized, no token')
    }
}

const isAdmin = async (req, res, next) => {
    if (req.user && req.user.isAdmin === 'admin') {
        next()
    } else {
        res.status(401).json({ message: 'Not authorized as an admin' })
        // throw new Error('Not authorized as an admin')
    }
}



module.exports = { protect, isAdmin }