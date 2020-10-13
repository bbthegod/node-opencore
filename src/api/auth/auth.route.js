const express = require('express');
const { validate } = require('express-validation');
const authValidation = require('./auth.validation');
const authCtrl = require('./auth.controller');
const { master } = require('../../middleware/master');
const { authentication } = require('../../middleware/authentication');

const router = express.Router();
router.route('/login').post(master, validate(authValidation.login), authCtrl.login);
router.route('/signup').post(master, validate(authValidation.signup), authCtrl.signup);
router.route('/check').get(authentication(['user', 'admin']), authCtrl.check);

module.exports = router;
