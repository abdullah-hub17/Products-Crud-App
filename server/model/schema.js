const mongoose = require("mongoose");

const product = mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    price: {
        type: String,
        required: true,
    }
}, {
    timestamps: true,
})

const Product = mongoose.model("Product", product);

module.exports = Product;