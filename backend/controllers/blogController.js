const Blog = require('../models/blog')
const User = require('../models/user')



const blog_index = async (req, res) => {

    try {
        const blog = await Blog.find({ user: req.user.id }).sort({ createdAt: -1 })

        if (!blog) return res.status(400).json({ message: 'Your not authorized', redirect: '/auth' })
        res.status(200).json({ message: 'All Blogs Returned' })
    } catch (error) {
        console.log(error)
    }
}

const blog_details = async (req, res) => {
    const id = req.params.id

    const blog = await Blog.findById(id)
    const user = await User.findById(req.user.id)

    try {
        if (!user) {
            res.status(400).json({ message: 'User Not Found' })
        }
        if (blog.user.toString() !== user.id) {
            res.status(400).json({ message: 'Not Authorized' })
        }

        res.status(200).json({ message: 'Blog Details' })
    } catch (error) {
        console.log(error)
    }
}


const blog_create_post = async (req, res) => {
    const blog = await Blog.create({
        user: req.user.id,
        title: req.body.title,
        snippet: req.body.snippet,
        body: req.body.body,
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

const blog_create_delete = async (req, res) => {
    const id = req.params.id

    const blog = await Blog.findById(id)
    const user = await User.findById(req?.user?.id)

    try {
        if (!user) {
            res.status(400).json({ message: 'User Not Found' })
        }
        if (blog.user.toString() !== user?.id) {
            res.status(400).json({ message: 'Not Authorized' })
            throw new Error('Not Authorized')
        }
        await blog.remove()
        res.json({ code: 204, message: 'delete successfully', redirect: '/blogs' })

    } catch (error) {
        console.log(error)
    }
}

const blog_create_update = async (res, req) => {
    const id = req.params.id

    const blog = await Blog.findByIdAndUpdate(id)
    const user = await User.findById(req.user.id)

    try {
        if (!user) {
            res.status(400).json({ message: 'User Not Found' })
        }
        if (blog.user.toString() !== user.id) {
            res.status(400).json({ message: 'Not Authorized' })
        }
        await blog.save({ _id: id }, { ...req.body })
        res.json({ code: 201, message: 'update blog successfully', redirect: `/blogs/${id}` })

    } catch (error) {
        console.log(error)
    }

}



module.exports = {
    blog_index,
    blog_details,
    blog_create_post,
    blog_create_update,
    blog_create_delete,
}