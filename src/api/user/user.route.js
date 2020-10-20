const express = require('express');
const { validate } = require('express-validation');
const validator = require('./user.validation');
const controller = require('./user.controller');
const authentication = require('../../middleware/authentication');

const router = express.Router();

router
  .route('/')
  .get(authentication(['user', 'admin']), controller.list)
  .post(authentication(['user', 'admin']), validate(validator.create, {}, {}), controller.create);

router
  .route('/:userId')
  .get(authentication(['user', 'admin']), controller.get)
  .put(authentication(['user', 'admin']), validate(validator.update, {}, {}), controller.update)
  .delete(authentication(['user', 'admin']), controller.remove);

router
  .route('/info/me')
  .get(authentication(['user', 'admin']), controller.getMe)
  .put(authentication(['user', 'admin']), controller.updateMe);

router.param('userId', controller.load);

module.exports = router;
