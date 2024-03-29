const express = require('express')
const router = express.Router()
const blogController = require('../controllers/blogController')
const { protect } = require('../middleware/authMiddleware')


//blog routes
router.route('/')
    .get(blogController.get_all_blogs)
    .post(protect, blogController.blog_create)

router.route('/:id')
    .get(blogController.get_blog_id)
    .patch(protect, blogController.blog_update_id)
    .delete(protect, blogController.blog_delete_id)


module.exports = router;