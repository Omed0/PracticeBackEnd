const express = require('express')
const app = express()
const morgan = require('morgan')
const mongoose = require('mongoose')
require('dotenv').config()
const Blog = require('./models/blog')


//connect to mongo db
const dbURI = process.env.DBURI;
mongoose.set('strictQuery', true)
mongoose.connect(dbURI, { useNewUrlParser: true, useUnifiedTopology: true })
    .then((result) => app.listen(3000))
    .catch((err) => console.log(err))

//register view engine
app.set('view engine', 'ejs')


//allow file in middleware to access
app.use(express.static('public'))
//midlleware      {morgan}
app.use(morgan('common'))

app.get('/add-blog', (req, res)=>{
    const blog = new Blog({
        title: 'new Blog 2',
        snippet: 'about my new blog 2',
        body: 'more about my new blog 2'
    })
    blog.save()
        .then((result)=>{
            res.send(result)
        })
        .catch((err)=>{
            console.log(err);
        })
})

app.get('/all-blogs', (req, res)=>{
    Blog.find()
        .then((result)=>{
            res.send(result)
        })
        .catch((err)=>{
            console.log(err);
        })
})

app.get('/single-blog', (req, res)=>{
    Blog.findById('63e6bd732f0b6697b5fb3d2c')
        .then((result)=>{
            res.send(result)
        })
        .catch((err)=>{
            console.log(err);
        })
})

//routes
//home page
app.get('/', (req, res) => {
    res.redirect('/blogs')
})

//about page
app.get('/about', (req, res) => {
    res.status(200).render('about', { title: 'about' })
})

//blog routes
app.get('/blogs',(req, res)=>{
    Blog.find().sort({ createdAt: -1 /* reverse i henanaway datakan */ })
        .then((result)=>{
             res.status(200).render('index', { title: 'All Blogs', blogs: result })
        })
        .catch((err)=>{
            console.log(err);
        })
})

//redirect page
app.get('/about-us', (req, res) => {
    res.redirect('/about')
})

//404 page
app.use((req, res) => {
    res.status(404).render('404', { title: 'Oops' })
})