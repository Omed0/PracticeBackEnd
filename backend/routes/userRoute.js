const express = require('express')
const router = express.Router()
const userController = require('../controllers/userController')
const { isAdmin, protect } = require('../middleware/authMiddleware')


//return All Users
router.get('/', userController.get_all_users)

//return User and delete and update
router.route('/:id')
    .get(userController.user_get_id)
    .patch(protect, userController.user_update_id)
    .delete(isAdmin, userController.user_delete_id)


module.exports = router   