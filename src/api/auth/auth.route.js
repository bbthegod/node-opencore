const express = require('express');
const { validate } = require('express-validation');
const validator = require('./auth.validation');
const controller = require('./auth.controller');
const master = require('../../middleware/master');
const authentication = require('../../middleware/authentication');

const router = express.Router();
router.route('/login').post(master, validate(validator.login), controller.login);
router.route('/signup').post(master, validate(validator.signup), controller.signup);
router.route('/check').get(authentication(['user', 'admin']), controller.check);

module.exports = router;
