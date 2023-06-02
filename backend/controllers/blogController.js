const Blog = require('../models/blog')
const User = require('../models/user')



const blog_index = async (req, res) => {

    try {
        const blogs = await Blog.find().sort({ createdAt: -1 })

        if (!blogs) return res.status(400).json({ message: 'Your not authorized', redirect: '/auth' })
        res.status(200).json({ message: 'All Blogs Returned', blogs })
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
            res.status(400).json({ message: 'Please create a user to see posts' })
        }
        if (blog.user.toString() !== user.id) {
            res.status(400).json({ message: 'Not Authorized' })
        }

        res.status(200).json({ message: 'Blog Details', blog })
    } catch (error) {
        console.log(error)
    }
}


const blog_create_post = async (req, res) => {س
    const id = req.user.id;
    const author = req.user.username;

    if (!id || !author) {
        return res.status(400).json({ message: 'Please create a user to see posts' });
    }

    const { title, snippet, body } = req.body;
    if (!title || !snippet || !body) {
        return res.status(400).json({ message: 'Please fill all the fields' });
    }

    try {
        const blog = await Blog.create({
            userId: id, // Assign id directly to the user field
            author: author,
            title,
            snippet,
            body,
        });

        if (blog) return res.status(201).json({ message: 'Blog Created', blog });
        else return res.status(400).json({ message: 'Invalid Blog Data' });
    } catch (error) {
        console.log(error);
    }
};


const blog_create_delete = async (req, res) => {
    const id = req.params.id

    const blog = await Blog.findById(id)
    const user = await User.findById(req?.user?.id)

    if (!user) return res.status(400).json({ message: 'User Not Found' })

    try {
        if (blog.userId.toString() !== user?.id) {
            res.status(400).json({ message: 'Not Authorized' })
            throw new Error('Not Authorized')
        } else {
            await blog.remove()
            res.json({ code: 204, message: 'delete successfully', redirect: '/blogs' })
        }

    } catch (error) {
        console.log(error)
    }
}

const blog_create_update = async (req, res) => {
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
        const updateBlog = await blog.updateOne({ _id: id, ...req.body })
        res.status(200).json({ message: 'Blog Updated', updateBlog })

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