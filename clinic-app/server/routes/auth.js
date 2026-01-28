// /routes/auth.js
const express = require('express');
const { body } = require('express-validator');
const router = express.Router();
const authCtrl = require('../controllers/authCtrl');

router.post('/register',
  [
    body('name').notEmpty().withMessage('Name required'),
    body('phone').notEmpty().withMessage('Phone required')
  ],
  authCtrl.register
);

router.post('/login',
  [
    body('phone').notEmpty().withMessage('Phone required'),
    body('password').notEmpty().withMessage('Password required')
  ],
  authCtrl.login
);

// optional: refresh token, logout, me
router.get('/me', authCtrl.protect, authCtrl.me);

module.exports = router;
