const express = require('express');
const router = express.Router();
const { authUser, registerUser, socialLogin } = require('../controllers/authController');

router.post('/login', authUser);
router.post('/social-login', socialLogin);
router.route('/').post(registerUser);

module.exports = router;
