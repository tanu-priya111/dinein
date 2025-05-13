const mongoose = require("mongoose");

const RestaurantSchema = new mongoose.Schema({
    name: String,
    location: String,
    tables: Number,
    image: { type: String}, 
    cost: { type: Number}, 
    rating: { type: Number}, 
});

module.exports = mongoose.model("Restaurant", RestaurantSchema);
