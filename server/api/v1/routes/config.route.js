const ConfigController = require('../controllers/config.controller');

module.exports = require('express').Router()
    .get('/:key', ConfigController.getConfig)
    .post('/', ConfigController.setConfig);
