const User = require('../models/user')
const bcrypt = require('bcrypt')


const user_index = (req, res) => {
    User.find()
        .then(result => {
            console.log(req.user);  // log the user
            res.status(200).render('users/user', { title: 'All User', Users: result })
        })
        .catch(err => console.log(err))
}

const user_create_get = (req, res) => {
    res.status(200).render('users/create', { title: 'Create User' })
}

const user_create_post = async (req, res) => {
    const createUser = {
        username: req.body.username,
        email: req.body.email,
        password: req.body.password
    }
    try {
        bcrypt.genSalt(10, (err, salt) => {
            bcrypt.hash(createUser.password, salt, (err, hash) => {
                createUser.password = hash
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
    User.findById(id)   // find by id
        .then((result) => {
            res.status(200).render('users/profileUser', { User: result, title: 'Profile' })
        })
        .catch((err) => {
            res.status(404).render('404', { title: 'Blog not found' }) // if not found then render 404 page
        })
}

module.exports = {
    user_index,
    user_create_get,
    user_create_post,
    user_id_get,
}