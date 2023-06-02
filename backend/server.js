const express = require('express')
const app = express()
require('dotenv').config();
const cors = require('cors')
const morgan = require('morgan') //for catch status and route
const mongoose = require('mongoose')
const bodyParser = require("body-parser");
const blogRoutes = require('./routes/blogRoutes')
const authRoute = require('./routes/authRoute')


//connect to mongo db
const MongoDB = process.env.MONGO_URL;
const MongoDB_PORT = process.env.MONGO_PORT || 3000;
mongoose.set('strictQuery', true)
mongoose.connect(MongoDB, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => {
        app.listen(MongoDB_PORT);
        console.log("express running on http://localhost:3000");
    })
    .catch((err) => console.log(err));

app.use(express.static('../client/dist'));

app.use(bodyParser.json({ limit: "30mb", extended: true }))
app.use(bodyParser.urlencoded({ limit: "30mb", extended: true }))
app.use(morgan('dev'))

const corsOptions = {
    "origin": 'http://localhost:3000/',
    "methods": "GET,PUT,PATCH,POST,DELETE",
    "optionsSuccessStatus": 200
}
app.use(cors(corsOptions))

//routes

app.use('/api/blogs', blogRoutes);
app.use('/api/auth', authRoute);

//404 page
app.use((req, res) => {
    res.status(404).render('404', { title: 'Oops' })
})