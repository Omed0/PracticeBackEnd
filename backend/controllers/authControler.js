const User = require('../models/user')
const bcrypt = require('bcrypt')
const { generateToken } = require('../utils/generateToken')


const register_user = async (req, res) => {

    const { username, email, password, isAdmin } = req.body

    if (!username || !email || !password || !isAdmin) {
        return res.status(400).json({ message: 'Please fill all the fields' })
    }

    const userExist = await User.findOne({ email })
    if (userExist) {
        return res.status(400).json({ message: "User already exist." })
    }
    // const passwordRegex = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])[0-9a-zA-Z]{8,}/;
    // const emailRegex = /\S+@\S+\.\S+/;

    // if (!passwordRegex.test(password)) {
    //     return res.status(400).json({ message: 'Invalid password format' });
    // }
    // // if (password !== confirmPassword) return res.status(400).json({ message: "Password don't match." });
    // if (!emailRegex.test(email)) {
    //     return res.status(400).json({ message: 'Invalid email format' });
    // }

    try {
        const salt = await bcrypt.genSalt(12)
        const hashedPassword = await bcrypt.hash(password, salt)
        const user = await User.create({
            username: username,
            email: email,
            password: hashedPassword,
            isAdmin: isAdmin,
        })
        if (user) {
            res.status(201).json({
                _id: user._id,
                username: user.username,
                isAdmin: user.isAdmin,
                token: generateToken(user._id, user.username, user.isAdmin),
            })
        } else {
            res.status(400).json({ message: 'Invalid user data' })
        }
    } catch (err) { console.log(err); }
}

// Login Function
const login_user = async (req, res) => {

    const { email, password } = req.body;

    if (!email || !password) {
        return res.status(400).json({ message: 'Please fill all the fields' })
    }

    try {
        const userExist = await User.findOne({ email })
        const isPasswordCorrect = await bcrypt.compare(password, userExist.password)
        if (!userExist && !isPasswordCorrect) return res.status(404).json({ message: "Please Right a correct credentials" })
        else {
            res.status(200).json({
                _id: userExist._id,
                username: userExist.username,
                isAdmin: userExist.isAdmin,
                token: generateToken(userExist._id, userExist.username, userExist.isAdmin),
            })
        }

    } catch (error) {
        console.log(error)
        throw (error)
    }
}


module.exports = {
    register_user,
    login_user,
}