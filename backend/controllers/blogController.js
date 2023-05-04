const Blog = require('../models/blog')



const blog_index = async (req, res) => {

    try {
        const blog = await Blog.find({ user: req.user.id }).sort({ createdAt: -1 })
        if(!blog) return 
        res.status(200).render('blogs/index', { title: 'All Blogs', blogs: result })
    } catch (error) {
        console.log(error)
    }
}

const blog_details = (req, res) => {
    const id = req.params.id

    try {
        Blog.findById(id)   // find by id
            .then((result) => {
                res.render('blogs/details', { blog: result, title: 'Blog Details' }) // render the blog details page
            })
            .catch((err) => {
                res.status(404).render('404', { title: 'Blog not found' }) // if not found then render 404 page
            })
    } catch (error) {
        console.log(error)
    }
}

const blog_create_get = (req, res) => {
    try {
        res.render('blogs/create', { title: 'Create a new Blog' })
    } catch (error) {
        console.log(error)
    }
}

const blog_create_post = async (req, res) => {
    const blog = await Blog.create({
        title: req.body.title,
        snippet: req.body.snippet,
        body: req.body.body,
        user: req.user.id
    })

    try {
        if (!blog) {
            res.status(400).json({ code: 400, message: 'create blog failed, no authorization' })
        } else {
            res.status(201).json({ code: 201, message: 'create blog successfully', redirect: '/blogs' })
        }
    } catch (error) {
        console.log(error)
    }
}

const blog_create_delete = (req, res) => {
    const id = req.params.id // get the id from the url

    try {
        Blog.findByIdAndDelete(id) // find by id and delete
            .then((result) => {
                res.json({ code: 204, message: 'delete successfully', redirect: '/blogs' }) // redirect to blogs page
            })
            .catch((err) => { console.log(err); })
    } catch (error) {
        console.log(error)
    }
}

const blog_create_update = () => {
    const { id } = req.params // get the id from the url

    try {
        Blog.findByIdAndUpdate({ _id: id }, { ...req.body })
            .then((result) => {
                res.json({ code: 201, message: 'update blog successfully', redirect: `/blogs/${id}` }) // redirect to blogs page
            }
            )
            .catch((err) => { console.log(err); })
    } catch (error) {
        console.log(error)
    }

}



module.exports = {
    blog_index,
    blog_details,
    blog_create_get,
    blog_create_post,
    blog_create_update,
    blog_create_delete,
}