const express = require('express')
const router = express.Router()
const authControler = require('../controllers/authControler')
const { isAdmin } = require('../middleware/authMiddleware')


//Login route
//Register route
router.post('/signup', authControler.register_user)
router.post('/signin', authControler.login_user)


module.exports = router   