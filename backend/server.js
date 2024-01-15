const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');

require('dotenv').config();


const app = express();

app.use(bodyParser.json());
app.use(cors());

mongoose.connect(process.env.MONGO_URL);
const db = mongoose.connection;
db.on('error', console.error.bind(console, 'MongoDB connection error:'));
db.once('open', () => {
    console.log('Connected to MongoDB');
});

const userRoutes = require('./routes/user');
const formRoutes = require('./routes/formRoute');
const plansRoutes = require('./routes/yourPlansRoute');
const flightsRoutes = require('./routes/flight');
const restaurantsRoutes = require('./routes/restaurant');
const hotelsRoutes = require('./routes/hotel');
const placesRoutes = require('./routes/place');

app.use('/api/user', userRoutes);
app.use('/api/form', formRoutes);
app.use('/api/plans', plansRoutes);
app.use('/api/flights', flightsRoutes);
app.use('/api/restaurants', restaurantsRoutes);
app.use('/api/hotels', hotelsRoutes);
app.use('/api/places', placesRoutes);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
