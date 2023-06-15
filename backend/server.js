const express = require('express')
const app = express()
require('dotenv').config();
const cors = require('cors')
const morgan = require('morgan') //for catch status and route
const mongoose = require('mongoose')
const bodyParser = require("body-parser");
const blogRoute = require('./routes/blogRoutes')
const authRoute = require('./routes/authRoute')
const userRoute = require('./routes/userRoute')


//connect to mongo db
const MongoDB = process.env.MONGO_URL;
const MongoDB_PORT = process.env.MONGO_PORT || 3000;
mongoose.set('strictQuery', true)
mongoose.connect(MongoDB, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => {
        app.listen(MongoDB_PORT);
        console.log("express running on http://localhost:3000/api");
    })
    .catch((err) => console.log(err));


app.use(express.static('../client/dist'));
app.use(bodyParser.json({ limit: "30mb", extended: true }))
app.use(bodyParser.urlencoded({ limit: "30mb", extended: true }))
app.use(morgan('dev'))

const corsOptions = {
    origin: 'http://localhost:5173',
    credentials: true,
    optionsSuccessStatus: 200,
    methods: 'GET, POST, PUT, DELETE, PATCH',
    allowedHeaders: 'Content-Type, Authorization, Origin, X-Requested-With, Accept'
};

app.use(cors(corsOptions));

//routes

app.use('/api/auth', authRoute);
app.use('/api/user', userRoute);
app.use('/api/blog', blogRoute);


//404 page
app.use((req, res) => {
    res.status(404).render('404', { title: 'Oops' })
})