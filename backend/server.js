const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');

require('dotenv').config();

const app = express();
app.use(cors({
    origin: 'https://neural-nexus-frontend.vercel.app',
    methods: ['GET', 'POST', 'DELETE', "PATCH", "OPTIONS",],
    credentials: true,
}));

app.use(bodyParser.json());

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
const newsRoutes = require('./routes/news');
const weatherRoutes = require('./routes/weather');
const planningpageRoutes = require('./routes/planningPage');
const eventRoutes = require('./routes/event');
const yourPlansRoutes = require('./routes/yourPlansRoute');

app.use('/api/user', userRoutes);
app.use('/api/form', formRoutes);
app.use('/api/plans', plansRoutes);
app.use('/api/flights', flightsRoutes);
app.use('/api/restaurants', restaurantsRoutes);
app.use('/api/hotels', hotelsRoutes);
app.use('/api/places', placesRoutes);
app.use('/api/news', newsRoutes);
app.use('/api/weather', weatherRoutes);
app.use('/api/planningpage', planningpageRoutes);
app.use('/api/events', eventRoutes);
app.use('/api/yourplans', yourPlansRoutes);

const PORT = process.env.PORT;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
