const router = require("express").Router();
const {checkout,cashPayment,creditCardPayment} = require('../controllers');
const { isAuthenticated } = require("../../../middlewares/isAuthenticate");

// Route for the checkout page
router.get('/checkout',checkout,isAuthenticated);

// Routes for different payment methods
router.get('/checkout/cash', cashPayment);
router.post('/checkout/card', creditCardPayment);

// Export the router
module.exports = router;