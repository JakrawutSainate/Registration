const mongoose = require('mongoose');

module.exports = mongoose.model('User', new mongoose.Schema({
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
    phone: { type: String, required: true }
}, { timestamps: true }));