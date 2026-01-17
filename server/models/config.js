const mongoose = require('mongoose');

module.exports = mongoose.model('Config', new mongoose.Schema({
    key: { type: String, required: true, unique: true },
    value: { type: Number, required: true }
}, { timestamps: true }));
