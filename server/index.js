require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const app = express();

module.exports = app
    // Middleware
    .use(express.json())
    .use(cors())

    // Routes
    .use('/api/v1/users', require('./api/v1/routes/user.route'))
    .use('/api/v1/config', require('./api/v1/routes/config.route'))

    // Start Server
    .listen(process.env.PORT || 8000, () => {
        console.log(`Server running on port ${process.env.PORT}`);
    });

// DB Config
mongoose.connect(process.env.MONGO_URL)
    .then(() => console.log("MongoDB Connected"))
    .catch((err) => console.error("DB Error:", err));