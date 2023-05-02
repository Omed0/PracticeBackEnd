const User = require('../models/user')
const bcrypt = require('bcrypt')

// Login Function

const user_login_get = (req, res) => {
    try {
        res.status(200).render('users/signin', { title: 'SignIn' })
    } catch (error) {
        console.log(error);
    }
}

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

        res.status(200).redirect(`/auth/${id}`)
    } catch (error) {
        console.log(error)
        throw (error)
    }
}

const user_index = (req, res) => {
    try {
        User.find()
            .then(result => {
                console.log(req.user);  // log the user
                res.status(200).render('users/user', { title: 'All User', Users: result })
            })
            .catch(err => console.log(err))
    } catch (error) {
        console.log(error);
    }
}


const user_create_get = (req, res) => {
    try {
        res.status(200).render('users/create', { title: 'Create User' })
    } catch (error) {
        console.log(error);
    }
}

const user_create_post = async (req, res) => {

    const { username, email, password, isAdmin } = req.body
    const createUser = {
        username: req.body.username,
        email: req.body.email,
        password: req.body.password,
        isAdmin: req.body.isAdmin
    }

    if (!username || !email || !password || !isAdmin) {
        return res.status(400).json({ code: 400, message: 'Please fill all the fields' })
    }

    const userExist = await User.findById({ email })
    if (userExist) {
        return res.status(400).json({ code: 400, message: 'Email already exist' })
    }
    // if (password !== confirmPassword) return res.status(400).json({ message: "Password don't match." });


    try {
        bcrypt.genSalt(12, (err, salt) => {
            bcrypt.hash(password, salt, (err, hash) => {
                password = hash
                User.create(createUser)
                    .then(result => {
                        res.status(201).redirect('/user')
                    })
                    .catch(err => console.log(err))
            })
        })
    } catch (err) { console.log(err); }
}


const user_id_get = (req, res) => {
    const id = req.params.id

    try {
        User.findById(id)   // find by id
            .then((result) => {
                res.status(200).render('users/profileUser', { User: result, title: 'Profile' })
            })
            .catch((err) => {
                res.status(404).render('404', { title: 'Blog not found' }) // if not found then render 404 page
            })
    } catch (error) { console.log(error); }
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


const user_id_update = (req, res) => {
    const { id } = req.params.id

    const updateUser = {
        username: req.body.username,
        email: req.body.email,
        password: req.body.password,
        isAdmin: req.body.isAdmin
    }
    try {
        bcrypt.genSalt(10, (err, salt) => {
            bcrypt.hash(updateUser.password, salt, (err, hash) => {
                updateUser.password = hash
                User.findByIdAndUpdate({ _id: id }, { updateUser })
                    .then(result => {
                        res.json({ code: 201, message: 'update user successfully', redirect: `/auth/${id}` })
                    })
                    .catch(err => console.log(err))
            })
        })
    } catch (err) { console.log(err); }
}


module.exports = {
    user_login_get,
    user_login_post,
    user_index,
    user_create_get,
    user_create_post,
    user_id_get,
    user_id_update,
    user_id_delete,
}