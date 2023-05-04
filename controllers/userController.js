const User = require('../models/user')
const bcrypt = require('bcrypt')


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
                res.json({ code: 204, message: 'User delete successfully', redirect: '/user' })
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
        password: req.body.password
    }
    try {
        bcrypt.genSalt(10, (err, salt) => {
            bcrypt.hash(updateUser.password, salt, (err, hash) => {
                updateUser.password = hash
                User.findByIdAndUpdate({ _id: id }, { updateUser })
                    .then(result => {
                        res.json({ code: 201, message: 'update user successfully', redirect: `/user/${id}` })
                    })
                    .catch(err => console.log(err))
            })
        })
    } catch (err) { console.log(err); }
}



module.exports = {
    user_index,
    user_create_get,
    user_create_post,
    user_id_get,
    user_id_update,
    user_id_delete,
}