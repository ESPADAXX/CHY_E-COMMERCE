const router = require('express').Router();
const {register,login}=require('../controllers')
router.route("/register").post(register);
router.route("/login").post(login)