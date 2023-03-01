const mongoose = require("mongoose");

const productSchema = new mongoose.Schema({
    productName: {
        type: String,
        required: true
    },
    modelName: {
        type: String,
        required: true,
        unique: true
    },
    mrp: {
        type: String,
        required: true,
        unique: true
    },
    sellingPrice: {
        type: String,
        required: true
    },
    soldPrice: {
        type: String,
        required: true
    }
});

module.exports = mongoose.model("product", productSchema);
