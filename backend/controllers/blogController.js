const Blog = require('../models/blog')
const User = require('../models/user')


const get_all_blogs = async (req, res) => {

    try {
        const blogs = await Blog.find().sort({ createdAt: -1 })

        if (!blogs) return res.status(400).json({ message: 'nothing to post, it is empty' })
        res.status(200).json({ message: 'get All blogs', blogs })
    } catch (error) {
        res.status(400).json({ message: 'nothing to post, it is empty' })
    }
}

const get_blog_id = async (req, res) => {
    const id = req.params.id

    const blog = await Blog.findById(id)

    try {
        if (!blog) {
            res.status(400).json({ message: 'Post not found' })
        }
        res.status(200).json({ message: 'get blog by id', blogId: blog._id })
    } catch (error) {
        console.log(error)
    }
}

const blog_create = async (req, res) => {

    const { title, snippet, body } = req.body;
    const { _id } = req.user;
    const user = await User.findById(_id)

    if (!user) return res.status(400).json({ message: 'Create user for creating post' })

    if (!user._id.equals(_id)) return res.status(401).json({ message: "You'r not authorized for creat post " });

    if (!title || !snippet || !body) return res.status(400).json({ message: 'Please fill all the fields' });

    try {
        const blog = await Blog.create({
            userId: _id, // Assign id directly to the user field
            author: user.username,
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

const blog_update_id = async (req, res) => {
    const id = req.params.id
    const { _id } = req.user

    const blog = await Blog.findById(id)
    const user = await User.findById(_id)

    if (!user) return res.status(400).json({ message: 'User Not Found' })
    if (!blog) return res.status(400).json({ message: 'Blog not found' })

    if (!blog.userId.equals(_id)) return res.status(401).json({ message: 'Not Authorized for update blog' })

    try {
        const updateBlog = await blog.updateOne({ _id: id, ...req.body })
        res.status(200).json({ message: 'Blog Updated', updateBlog })

    } catch (error) {
        console.log(error)
    }

}

const blog_delete_id = async (req, res) => {
    const id = req.params.id
    const { _id } = req.user

    const blog = await Blog.findById(id)
    const user = await User.findById(_id)

    if (!user) return res.status(400).json({ message: 'User Not Found' })
    if (!blog) return res.status(400).json({ message: 'Blog not found' })
    if (!blog.userId.equals(_id)) return res.status(401).json({ message: 'Not Authorized for deleting this blog' })

    try {
        await blog.remove()
        res.status(200).json({ code: 204, message: 'delete successfully', blogId: blog._id })
    } catch (error) {
        console.log(error)
    }
}


module.exports = {
    get_all_blogs,
    get_blog_id,
    blog_create,
    blog_delete_id,
    blog_update_id,
}