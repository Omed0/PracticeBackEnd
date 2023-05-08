const express = require('express')
const router = express.Router()
const blogController = require('../controllers/blogController')
const { protect } = require('../middleware/authMiddleware')


//blog routes
router.route('/')
    .post(protect, blogController.blog_create_post)
    .get(protect, blogController.blog_index)

router.route('/:id')
    .get(protect, blogController.blog_details)
    .delete(protect, blogController.blog_create_delete)
    .patch(protect, blogController.blog_create_update)


// const users = [{ name: 'omed' }, { name: 'asi' }]
// router.param('id', (req, res, next, id) => {
//     console.log('id is: ', id)
//     req.user = users[id]
//     next()
// })


module.exports = router;