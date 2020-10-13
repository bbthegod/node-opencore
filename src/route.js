const express = require('express');
const userRoutes = require('./api/user/user.route');
const authRoutes = require('./api/auth/auth.route');

const router = express.Router();
router.get('/health-check', (req, res) => res.send('OK'));
router.use('/user', userRoutes);
router.use('/auth', authRoutes);
module.exports = router;
