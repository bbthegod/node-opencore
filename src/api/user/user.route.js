const express = require('express');
const { validate } = require('express-validation');
const userValidation = require('./user.validation');
const userCtrl = require('./user.controller');
const { authentication } = require('../../middleware/authentication');

const router = express.Router();

router
  .route('/')
  .get(authentication(['user', 'admin']), userCtrl.list)
  .post(authentication(['user', 'admin']), validate(userValidation.create, {}, {}), userCtrl.create);

router
  .route('/:userId')
  .get(authentication(['user', 'admin']), userCtrl.get)
  .put(authentication(['user', 'admin']), validate(userValidation.update, {}, {}), userCtrl.update)
  .delete(authentication(['user', 'admin']), userCtrl.remove);

router
  .route('/info/me')
  .get(authentication(['user', 'admin']), userCtrl.getMe)
  .put(authentication(['user', 'admin']), userCtrl.updateMe);

router.param('userId', userCtrl.load);

module.exports = router;
