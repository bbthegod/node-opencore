const express = require('express');
const user = require('./api/user/user.route');
const auth = require('./api/auth/auth.route');

const router = express.Router();
router.get('/health', (req, res) => res.send('OK'));
router.use('/user', user);
router.use('/auth', auth);
module.exports = router;
