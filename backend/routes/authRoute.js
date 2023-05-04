const express = require('express')
const router = express.Router()
const userController = require('../controllers/userController')
const { protect } = require('../middleware/authMiddleware')

//register route
router.route('/create')
    .get(userController.user_create_get)

router.route('/')
    .get(userController.user_index)
    .post(userController.user_create_post)

router.route('/:id')
    .get(protect, userController.user_id_get)
    .delete(protect, userController.user_id_delete)


//register route
router.route('/signin')
    .get(userController.user_login_get)
    .post(userController.user_login_post)


module.exports = router    // Path: routes\blogRoutes.js 