
const User = require('../models/user')
const bcrypt = require('bcrypt')
const { generateToken } = require('../utils/generateToken')


const user_index = async (req, res) => {
    try {
        const allUser = await User.find().sort({ createdAt: -1 }) // find all blogs and sort by created date reverse order
        res.status(200).json({ message: 'all users returned', allUser })

        console.log(allUser);  // log the user

    } catch (error) {
        console.log(error)
    }
}

const user_create = async (req, res) => {

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
                token: generateToken(user),
            })
        } else {
            res.status(400).json({ message: 'Invalid user data' })
        }
    } catch (err) { console.log(err); }
}


const user_id_get = async (req, res) => {
    const id = req.params.id;

    try {
        const user = await User.findOne({ _id: id });

        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        res.status(200).json({ message: 'User Details', user });
    } catch (error) {
        console.log(error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
};


const user_id_delete = async (req, res) => {
    const id = req.params.id

    try {
        const deleteUser = await User.findByIdAndDelete(id)
        if (!deleteUser) return res.status(400).json({ message: 'User not found' });
        res.status(204).json({ code: 204, message: 'User delete successfully', deleteUser, redirect: '/auth' })
    } catch (error) { console.log(error); }
}


const user_id_update = async (req, res) => {
    const id = req.params.id

    const { username, email, password, isAdmin } = req.body

    const salt = await bcrypt.genSalt(12)
    const hashedPassword = await bcrypt.hash(password, salt)
    const existUser = await User.findById(id)

    const updateUser = {
        username: username,
        email: email,
        password: hashedPassword,
        isAdmin: isAdmin
    }
    if (!username || !email || !password || !isAdmin) return res.status(400).json({ message: 'Please fill all the fields' })
    if (!existUser) return res.status(400).json({ message: 'User not found' });

    const passwordRegex = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])[0-9a-zA-Z]{8,}$/;
    if (!passwordRegex.test(updateUser.password)) {
        return res.status(400).json({ message: 'Invalid password format' });
    }

    try {
        const user = await User.findByIdAndUpdate(id, updateUser, { new: true })
        if (!user) return res.status(400).json({ message: 'User not found' });
        res.status(200).json({ code: 200, message: 'User update successfully', user, redirect: '/auth' });

    } catch (err) { console.log(err); }
}

// Login Function
const user_login = async (req, res) => {

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
                token: generateToken(userExist),
            })
        }

    } catch (error) {
        console.log(error)
        throw (error)
    }
}


module.exports = {
    user_index,
    user_create,
    user_id_get,
    user_id_update,
    user_id_delete,
    user_login,
}