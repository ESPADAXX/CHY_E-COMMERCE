const router = require('express').Router();
const { register, login } = require('../controllers')
const { validation, handleValidationErrors } = require('../middelwares/validationData');
const { verifyForEmail } = require('../middelwares/verifyForEmail')
const { ressetPassword } = require('../controllers/index')
const {verifyPassword}= require('../middelwares/verifyForPassword')
router.post("/register", validation, handleValidationErrors, register);
router.post("/login", validation, handleValidationErrors, login);
router.post("/verify", verifyForEmail)
router.post("/resset-password", ressetPassword)
router.post("/verifyPassword",verifyPassword)
module.exports = router;

// isMod = (req,res,next) => {
//     if (req.body.role === 'mod') {
//     next()
// } else {
//     isAdmin(req,res,next)
// }}
// isAdmin = (req,res,next) => {
//     if (!req.body.role === 'admin') {
//         return false
//     }
//     next()
// }