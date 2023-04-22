const mongoose = require("mongoose")

const booking = new mongoose.Schema({
    names :Array

})

module.exports = mongoose.model("booking",booking )