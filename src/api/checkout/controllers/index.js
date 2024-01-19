const Account = require('../../../models/Account');
const Order = require('../../../models/Order');
const stripe = require("stripe")(process.env.STRIPE_API);

exports.checkout = async (req, res) => {
    try {
        const usersTerm = req.query.id ;
        const {order_id} = req.body
        const account = await Account.findOne({ _id: usersTerm});
        if (account) {
            const order = await Order.findOne({_id : order_id});
            if (order) {
              const produits = order.products.map(product => product.title);
              res.status(200).json({
                message : "order found", 
                order : [{"produit" : produits , 
                          "prix total" : order.totalPrice ,
                          "customer" : order.customer.fullName
                        }] });
            } else {
              res.status(500).json({message : "order not found"}); 
            }
        } else {
            res.status(500).json({message : "user not found"}); 
        }
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Internal Server Error' });
    }
};

exports.cashPayment = async (req, res) => {
    try {
        res.send('Cash payment processed successfully');
    } catch (err) {
        console.error(err);
        res.status(500).send('Internal Server Error');
    }
};

exports.creditCardPayment = async (req, res) => {
    try {
        const { cardName, cardNumber, cardDate, cardCvv } = req.body;

        function isString(value) {
            return typeof value === 'string';
          }
          
          function isNumber(value) {
            return typeof value === 'number';
          }
          
          function isValidMonth(month) {
            return parseInt(month, 10) >= 1 && parseInt(month, 10) <= 12;
          }
          
          function isValidYear(year) {
            const currentYear = new Date().getFullYear();
            return parseInt(`20${year}`, 10) >= currentYear;
          }
          
          function isDate(value) {
            const currentDate = new Date();
            const [month, year] = value.split('/');
            const cardDate = new Date(parseInt(`20${year}`, 10), parseInt(month, 10) - 1);
            return /^\d{2}\/\d{2}$/.test(value) && isValidMonth(month) && isValidYear(year) && cardDate >= currentDate;
          }
          
          if (
            isString(cardName) &&
            isNumber(cardNumber) && 
            cardNumber.toString().length === 16 &&
            isDate(cardDate) &&
            isNumber(cardCvv) &&
            cardCvv.toString().length === 3
          ){
            res.send('Credit card information is valid');
          // Process payment logic here
        } else {
          res.send('Invalid credit card information');
        }
                
    } catch (err) {
        console.error(err);
        res.status(500).send('Internal Server Error');
    }
};
