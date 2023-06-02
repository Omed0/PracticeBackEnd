const mongoose = require('mongoose')
const Schema = mongoose.Schema

const blogSchema = new Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'UserId',
    },
    author: {
        type: String,
        required: true,
        ref: 'Author',
    },
    title: {
        type: String,
        required: true
    },
    snippet: {
        type: String,
        required: true
    },
    body: {
        type: String,
        required: true
    },
}, { timestamps: true })

const Blog = mongoose.model('Blog', blogSchema)

module.exports = Blog;