const jwt = require("jsonwebtoken")

// Generate JWT
const generateToken = (props) => {
    return jwt.sign(
        {
            _id: props._id,
            author: props.username,
            email: props.email,
            isAdmin: props.isAdmin,
        },
        process.env.JWT_SECRET,
        { expiresIn: '30d' }
    )
}

module.exports = {
    generateToken,
}