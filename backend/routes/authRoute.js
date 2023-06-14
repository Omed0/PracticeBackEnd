const express = require('express')
const router = express.Router()
const authControler = require('../controllers/authControler')


//Login route
//Register route
router.post('/signup', authControler.register_user)
    .post('/signin', authControler.login_user)


module.exports = router   