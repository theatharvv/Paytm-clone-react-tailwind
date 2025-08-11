const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
    firstName: { type: String, required: true, trim: true, maxLength: 30 },
    lastName: { type: String, required: true, trim: true, maxLength: 30 },
    email: { type: String, required: true, unique: true, trim: true, minLength: 3 },
    password: { type: String, required: true, trim: true, minLength: 6 }
})

module.exports = mongoose.model("User", userSchema); 