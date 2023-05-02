const express = require('express')
const router = express.Router()
const blogController = require('../controllers/blogController')



//blog routes
router.get('/create', blogController.blog_create_get)

router.route('/')
    .post( blogController.blog_create_post )
    .get( blogController.blog_index )

router.route('/:id')
    .get( blogController.blog_details )
    .delete( blogController.blog_create_delete )


// const users = [{ name: 'omed' }, { name: 'asi' }]
// router.param('id', (req, res, next, id) => {
//     console.log('id is: ', id)
//     req.user = users[id]
//     next()
// })


module.exports = router;