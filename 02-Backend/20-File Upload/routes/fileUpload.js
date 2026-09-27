const express = require('express');
const Router = express.Router();
const localFileUpload = require('../controllers/fileUpload.js')

// const {localFileUpload} = require('../controllers/fileUpload.js');

Router.post('/localFileUpload', localFileUpload);

module.exports = Router;