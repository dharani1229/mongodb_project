const mongoose = require("mongoose")

const userSchema = new mongoose.Schema({
    name:{
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true,
        unique: true
    },
    email: {
        type: String,
        required: true
    },
    phonenumber: {
        type: String,
        unique: true
    },
    GSTnumber: {
        type: String
    },
    pancard: {
        type: String
    },
    DOb: { 
        type: String
    },
    tocken:{
        type: String,
        require: true
    }
});

module.exports = mongoose.model("User", userSchema);