const express = require('express')
const router = express.Router()
const userController = require('../controllers/userController')
const { protect } = require('../middleware/authMiddleware')

//return All Users
router.get('/', userController.user_index)
//return User and delete
router.route('/:id')
    .get(protect, userController.user_id_get)
    .delete(protect, userController.user_id_delete)
//Login route
router.post('/signin', userController.user_login_post)
//Register route
router.post('/signup', userController.user_create_post)


module.exports = router    // Path: routes\blogRoutes.js 