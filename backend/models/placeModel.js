const mongoose = require('mongoose');

const placeSchema = new mongoose.Schema({
    name: { type: String, required: true },
    image: { type: String, required: true },
    description: { type: String },
    address: { type: String },
    ranking: { type: Number }
});

const Place = mongoose.model('Place', placeSchema);

module.exports = Place;