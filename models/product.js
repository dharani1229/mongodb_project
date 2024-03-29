const mongoose = require("mongoose");

const productSchema = new mongoose.Schema({
    productName: {
        type: String,
        required: true
    },
    modelName: {
        type: String,
        required: true,
    },
    mrp: {
        type: String,
        required: true,
    },
    sellingPrice: {
        type: String,
        required: true
    },
    sellingPriceDate: {
        type: String,
        require:true
    },
    soldPrice: {
        type: String,
        required: true
    },
    Date:{
        type: Date,
        default: Date.now
    },
    quantity: {
        type: Number,
        default: 1,
      },
      sold: {
        type: Boolean,
        default: false,
      }
});

module.exports = mongoose.model("product", productSchema);
