const router = require('express').Router();
const { register, login,logout } = require('../controllers')
const { RegisterValidation, handleRegisterValidationErrors } = require('../middelwares/validationDataRegister');
const { loginValidation, handleLoginValidationErrors } = require('../middelwares/validationDataLogin');
const { verifyForEmail } = require('../middelwares/verifyForEmail')
const { ressetPassword } = require('../controllers/index')
const {verifyPassword}= require('../middelwares/verifyForPassword');
const isAuthenticated  = require('../../../middlewares/isAuthenticate');
const passport = require('passport')
const { oAuth2 } = require('../controllers'); // Import the oAuth2 function


oAuth2();
router.post("/register", RegisterValidation, handleRegisterValidationErrors, register);
router.post("/login", loginValidation, handleLoginValidationErrors, login);
router.post("/logout",isAuthenticated,logout)
router.post("/verify", verifyForEmail)
router.post("/resset-password", ressetPassword)
router.post("/verifyPassword", verifyPassword)
router.get('/google', passport.authenticate('google', { scope: ['profile', 'email'] }));
router.get('/google/callback',
  passport.authenticate('google',{ failureRedirect: '/' }),
  (req, res) => {
    // Successful authentication, send the response
    res.status(201).json({
      success: true,
      message: "Authentication successful",
      accessToken: req.user.accessToken,
      
    });
  }
);
module.exports = router;