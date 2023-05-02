const express = require('express')
const router = express.Router()
const userController = require('../controllers/userController')

//register route
router.get('/create', userController.user_create_get)

router.get('/', userController.user_index)
router.post('/', userController.user_create_post)

router.get('/:id', userController.user_id_get)
router.delete('/:id', userController.user_id_delete)


//register route
router.get('/signin', userController.user_login_get)
router.post('/', userController.user_login_post)


module.exports = router    // Path: routes\blogRoutes.js 