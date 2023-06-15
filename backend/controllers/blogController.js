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
            res.status(400).json({ message: 'Posts not found' })
        }
        res.status(200).json(blog)
    } catch (error) {
        console.log(error)
    }
}

const blog_create = async (req, res) => {

    const { title, snippet, body } = req.body;
    const { _id, username } = req.user;
    const user = await User.findById(_id)

    if (user) return res.status(400).json({ message: 'Create user for creating post' })

    if (user._id.toString() !== _id) return res.status(400).json({ message: "You'r not authorized for creat post " });

    if (!title || !snippet || !body) return res.status(400).json({ message: 'Please fill all the fields' });

    try {
        const blog = await Blog.create({
            userId: _id, // Assign id directly to the user field
            author: username,
            title,
            snippet,
            body,
        });

        if (blog) return res.status(201).json({ message: 'Blog Created' });
        else return res.status(400).json({ message: 'Invalid Blog Data' });
    } catch (error) {
        console.log(error);
    }
};

const blog_update_id = async (req, res) => {
    const id = req.params.id

    const blog = await Blog.findById(id)
    const user = await User.findById(req.user._id)

    if (!user) return res.status(400).json({ message: 'User Not Found' })
    if (!blog) return res.status(400).json({ message: 'Blog not found' })

    if (blog.userId.toString() !== user._id) return res.status(400).json({ message: 'Not Authorized for update blog' })

    try {
        await blog.updateOne({ _id: id, ...req.body })
        res.status(200).json({ message: 'Blog Updated' })

    } catch (error) {
        console.log(error)
    }

}

const blog_delete_id = async (req, res) => {
    const id = req.params.id

    const blog = await Blog.findById(id)
    const user = await User.findById(req.user?._id)

    if (!user) return res.status(400).json({ message: 'User Not Found' })

    try {
        if (blog.userId.toString() !== user?._id) {
            res.status(400).json({ message: 'Not Authorized for deleting this blog' })
            // throw new Error('Not Authorized for deleting this blog')
        } else {
            await blog.remove()
            res.status(204).json({ message: 'delete successfully' })
        }

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