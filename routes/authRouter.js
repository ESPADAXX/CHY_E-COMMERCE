const express = require('express');
const router = express.Router();
const authController = require('../controllers/authControllers')
const register = authController.register()
const login = authController.login()

router.post('/register', (req, res) => {
  return register(req, res);
});

router.post('/login', (req, res) => {
  return login(req, res);
});

module.exports = router;