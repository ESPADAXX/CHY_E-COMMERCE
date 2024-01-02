const router = require('express').Router();
const { register, login,logout } = require('../controllers')
const { RegisterValidation, handleRegisterValidationErrors } = require('../middelwares/validationDataRegister');
const { loginValidation, handleLoginValidationErrors } = require('../middelwares/validationDataLogin');
const { verifyForEmail } = require('../middelwares/verifyForEmail')
const { ressetPassword } = require('../controllers/index')
const {verifyPassword}= require('../middelwares/verifyForPassword');
const { isAuthenticated } = require('../../../middlewares/isAuthenticate');

router.post("/register", RegisterValidation, handleRegisterValidationErrors, register);
router.post("/login", loginValidation, handleLoginValidationErrors, login);
router.post("/logout",isAuthenticated,logout)
router.post("/verify", verifyForEmail)
router.post("/resset-password", ressetPassword)
router.post("/verifyPassword",verifyPassword)

module.exports = router;
