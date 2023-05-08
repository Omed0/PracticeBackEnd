const express = require('express')
const app = express()
// const cors = require('cors')
const mongoose = require('mongoose')
const morgan = require('morgan') //for catch status and route
require('dotenv').config()
const bodyParser = require("body-parser");
const blogRoutes = require('./routes/blogRoutes')
const authRoute = require('./routes/authRoute')

//connect to mongo db
const MongoDB = process.env.MONGO_URL || 3000;
mongoose.set('strictQuery', true)
mongoose.connect(MongoDB, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => app.listen(3000) + console.log("express running on http://localhost:3000"))


//allow file in middleware to access
// app.use(express.static('public'))
app.use(bodyParser.json({ limit: "30mb", extended: true }))
app.use(bodyParser.urlencoded({ limit: "30mb", extended: true }))
// app.use((req, res, next) => {
//     res.locals.path = req.path;
//     next();
// });
//register view engine
//midlleware  {morgan}
app.use(morgan('dev'))

app.get('/', (req, res) => {
    res.status(302).redirect('/blogs')
})
app.get('/about', (req, res) => {
    res.status(200).json({ message: 'Return about Me' })
})

app.use('/blogs', blogRoutes)
app.use('/auth', authRoute)

//404 page
app.use((req, res) => {
    res.status(404).render('404', { title: 'Oops' })
})