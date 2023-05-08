const express = require('express')
const router = express.Router()
const userController = require('../controllers/userController')
const { protect } = require('../middleware/authMiddleware')

//register route

router.route('/')
    .get(userController.user_index)

router.route('/:id')
    .get(protect, userController.user_id_get)
    .delete(protect, userController.user_id_delete)


//register route
router.route('/signin')
    .post(userController.user_login_post)
    .post(userController.user_create_post)



module.exports = router    // Path: routes\blogRoutes.js 