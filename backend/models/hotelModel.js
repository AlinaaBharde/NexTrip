const mongoose = require('mongoose');

const hotelSchema = new mongoose.Schema({
    name: { type: String, required: true },
    location: { type: String, required: true },
    price: { type: Number, required: true, min: 0, default: 0 },
    url: { type: String, required: true },
    imageurl: { type: String, required: true },
    rating: { type: Number, required: true, min: 0, max: 5, default: 0 },
});

const Hotel = mongoose.model('Hotel', hotelSchema);

module.exports = Hotel;
