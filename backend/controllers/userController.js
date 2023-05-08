const User = require('../models/user')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const { generateToken } = require('../utils/generateToken')


const user_index = async (req, res) => {
    try {
        const allUser = await User.find().sort({ createdAt: -1 }) // find all blogs and sort by created date reverse order
        res.status(200).json({ message: 'All Users Returned' })

        console.log(allUser);  // log the user

    } catch (error) {
        console.log(error)
    }
}


const user_create_post = async (req, res) => {

    const { username, email, password, isAdmin } = req.body

    if (!username || !email || !password || !isAdmin) {
        return res.status(400).json({ message: 'Please fill all the fields' })
    }

    const userExist = await User.findOne({ email })
    if (userExist) {
        return res.status(400).json({ message: 'Email already exist' })
    }
    // if (password !== confirmPassword) return res.status(400).json({ message: "Password don't match." });

    try {
        const salt = await bcrypt.genSalt(12)
        const hashedPassword = await bcrypt.hash(password, salt)

        const user = await User.create({
            username: req.body.username,
            email: req.body.email,
            password: hashedPassword,
            isAdmin: req.body.isAdmin,
        })
        if (user) {
            res.status(201).json({
                _id: user.id,
                email: user.email,
                isAdmin: user.isAdmin,
                token: generateToken(user._id),
            })
        } else {
            res.status(400).json({ message: 'Invalid user data' })
        }


    } catch (err) { console.log(err); }
}


const user_id_get = async (req, res) => {

    try {
        const { _id, username, email, password } = await User.findById(req.user.id)
        res.status(200).json({
            _id,
            username,
            email,
            password
        })


        // res.status(404).render('404', { title: 'User not found' }) 
    } catch (error) {
        console.log(error)
    }
}


const user_id_delete = (req, res) => {
    const id = req.params.id

    try {
        User.findByIdAndDelete(id)
            .then(result => {
                res.json({ code: 204, message: 'User delete successfully', redirect: '/auth' })
            }
            )
            .catch(err => console.log(err))
    } catch (error) { console.log(error); }
}


const user_id_update = async (req, res) => {
    const id = req.params.id

    const salt = await bcrypt.genSalt(12)
    const hashedPassword = await bcrypt.hash(password, salt)

    const updateUser = {
        username: req.body.username,
        email: req.body.email,
        password: hashedPassword,
        isAdmin: req.body.isAdmin
    }
    try {
        await User.findByIdAndUpdate(id, updateUser, { new: true })
        res.json({ code: 201, message: 'update user successfully', redirect: `/auth/${id}` })

    } catch (err) { console.log(err); }
}

// Login Function

const user_login_post = async (req, res) => {

    const { email, password, isAdmin } = req.body;
    if (!email || !password || !isAdmin) {
        return res.status(400).json({ message: 'Please fill all the fields' })
    }

    try {
        const userExist = await User.findOne({ email })
        if (!userExist) return res.status(404).json({ message: "User dosn't exist." });

        const isPasswordCorrect = await bcrypt.compare(password, userExist.password)
        if (!isPasswordCorrect) return res.status(400).json({ message: "Invalid credentials." });

        else if (userExist.isAdmin !== isAdmin) return res.status(403).json({ message: "your not allowed." });

        else {
            res.status(200).json({
                _id: userExist.id,
                email: userExist.email,
                isAdmin: userExist.isAdmin,
                token: generateToken(userExist._id),
            })
        }

    } catch (error) {
        console.log(error)
        throw (error)
    }
}


module.exports = {
    user_index,
    user_create_post,
    user_id_get,
    user_id_update,
    user_id_delete,
    user_login_post,
}