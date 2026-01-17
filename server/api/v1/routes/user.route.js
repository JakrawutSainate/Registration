const UserController = require('../controllers/user.controller');

module.exports = require('express').Router()
    .get('/', UserController.getAllUsers)
    .get('/stats', UserController.getStats)
    .post('/register', UserController.registerUser);
