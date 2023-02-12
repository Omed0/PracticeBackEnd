const express = require('express')
const app = express()
const morgan = require('morgan') //for catch status and route
const mongoose = require('mongoose')
require('dotenv').config()
const Blog = require('./models/blog')



//connect to mongo db
const MongoDB = process.env.MONGO;
mongoose.set('strictQuery', true)
mongoose.connect(MongoDB, { useNewUrlParser: true, useUnifiedTopology: true })
    .then((result) => app.listen(3000))
    .catch((err) => console.log(err))

//register view engine
app.set('view engine', 'ejs')


//allow file in middleware to access
app.use(express.static('public'))
app.use(express.urlencoded({ extended: true }))
app.use((req, res, next) => {
    res.locals.path = req.path;
    next();
});
//midlleware      {morgan}
app.use(morgan('dev'))



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
app.get('/blogs/create', (req, res) => {
    res.render('create', { title: 'Create a new Blog' })
})

app.get('/blogs', (req, res) => {
    Blog.find().sort({ createdAt: -1 /* reverse i henanaway datakan */ })
        .then((result) => {
            res.status(200).render('index', { title: 'All Blogs', blogs: result })
        })
        .catch((err) => {
            console.log(err);
        })
})

app.post('/blogs', (req, res) => {
    const blog = new Blog(req.body)

    blog.save()
        .then((result) => {
            res.redirect('/blogs')
        }).catch((err) => {
            console.log(err);
        })
})

app.get('/blogs/:id', (req, res) => {
    const id = req.params.id
    Blog.findById(id)
        .then((result) => {
            res.render('details', { blog: result, title: 'Blog Details' })
        })
})


app.delete('/blogs/:id', (req, res) => {
    const id = req.params.id

    Blog.findByIdAndDelete(id)
        .then((result) => {
            res.json({ code: 200, message: 'Updated successfully', redirect: '/blogs' })
        })
        .catch((err) => { console.log(err); })
})

//redirect page
app.get('/about-us', (req, res) => {
    res.redirect('/about')
})

//404 page
app.use((req, res) => {
    res.status(404).render('404', { title: 'Oops' })
})