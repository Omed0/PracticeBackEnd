const express = require('express')
const app = express()
const morgan = require('morgan') //for catch status and route
const mongoose = require('mongoose')
require('dotenv').config()
const blogRoutes = require('./routes/blogRoutes')



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
app.use('/blogs', blogRoutes)


//redirect page
app.get('/about-us', (req, res) => {
    res.redirect('/about')
})

//404 page
app.use((req, res) => {
    res.status(404).render('404', { title: 'Oops' })
})