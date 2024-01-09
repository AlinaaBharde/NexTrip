require('dotenv').config();

const express = require('express');
const mongoose = require('mongoose');
const userRoutes = require('./routes/user')
const cors = require('cors');

const app = express();

app.use(cors());

app.use(express.json())

app.use((req, res, next) => {
    console.log(req.path, req.method)
    next()
})

app.use('/api/user', userRoutes)

const port = process.env.PORT

mongoose.connect(process.env.MONGO_URL)
    .then(() => {
        app.listen(port, () => {
            console.log('connected to db & listening on port', port)
        })
    })
    .catch((error) => {
        console.log(error)
    })
