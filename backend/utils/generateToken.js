const jwt = require("jsonwebtoken")

// Generate JWT
const generateToken = (props) => {
    return jwt.sign(
        {
            _id: props._id,
            username: props.username,
            isAdmin: props.isAdmin,
        },
        process.env.JWT_SECRET,
        { expiresIn: '30d' }
    )
}

module.exports = {
    generateToken,
}