const Blog = require('../models/blog')



const blog_index = (req, res) => {

    Blog.find().sort({ createdAt: -1 }) // find all blogs and sort by created date reverse order
        .then((result) => {
            console.log(req.user);
            res.status(200).render('blogs/index', { title: 'All Blogs', blogs: result })   // render the blog index page
        })
        .catch((err) => {
            console.log(err);  // if error then log it
        })
}

const blog_details = (req, res) => {
    const id = req.params.id
    Blog.findById(id)   // find by id
        .then((result) => {
            res.render('blogs/details', { blog: result, title: 'Blog Details' }) // render the blog details page
        })
        .catch((err) => {
            res.status(404).render('404', { title: 'Blog not found' }) // if not found then render 404 page
        })
}

const blog_create_get = (req, res) => {
    res.render('blogs/create', { title: 'Create a new Blog' }) // render the blog create page
}

const blog_create_post = (req, res) => {
    const blog = new Blog(req.body) // create a new blog

    blog.save()
        .then((result) => {
            res.redirect('/blogs') // redirect to blogs page
        }).catch((err) => {
            console.log(err); // if error then log it
        })
}

const blog_create_delete = (req, res) => {
    const id = req.params.id // get the id from the url

    Blog.findByIdAndDelete(id) // find by id and delete
        .then((result) => {
            res.json({ code: 200, message: 'Updated successfully', redirect: '/blogs' }) // redirect to blogs page
        })
        .catch((err) => { console.log(err); }) // if error then log it
}



module.exports = {
    blog_index,
    blog_details,
    blog_create_get,
    blog_create_post,
    blog_create_delete,
}