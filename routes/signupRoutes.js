const express = require('express')
const router = express.Router()
const userController = require('../controllers/userController')


router.route('/create')
    .get(userController.user_create_get)

router.route('/')
    .get(userController.user_index)
    .post(userController.user_create_post)

router.route('/:id')
    .get(userController.user_id_get)
    .delete(userController.user_id_delete)

module.exports = router    // Path: routes\blogRoutes.js 