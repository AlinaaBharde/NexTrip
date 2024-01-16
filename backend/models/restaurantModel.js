const mongoose = require('mongoose');

const restaurantSchema = new mongoose.Schema({
    name: { type: String, required: true },
    location: { type: String, required: true },
    cuisine: { type: [String], required: true },
    pricetag: { type: String, required: true, min: 0 },
    averagerating: { type: Number, required: true, min: 0, max: 5 },
    image: { type: String, required: true },
});

const Restaurant = mongoose.model('Restaurant', restaurantSchema);

module.exports = Restaurant;
