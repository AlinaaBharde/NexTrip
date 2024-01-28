const mongoose = require('mongoose');

const hotelSchema = new mongoose.Schema({
    name: { type: String, required: true },
    location: { type: String },
    price: { type: String, required: true },
    url: { type: String, required: true },
    imageurl: { type: String },
    rating: { type: Number, required: true, min: 0, max: 5, default: 0 },
});

const Hotel = mongoose.model('Hotel', hotelSchema);

module.exports = Hotel;
