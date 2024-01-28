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
      var totalProducts = []
      const {order_id, user_id} = req.body
      const account = await Account.findOne({ _id: user_id});
      if (account) {
        const order = await Order.findOne({_id : order_id});
        if (order) {
          var totalPrice = order.totalPrice
          order.products.forEach(product => {totalProducts.push(product.title);}); 
          const session = await stripe.checkout.sessions.create({
            line_items: [
              {
                price_data: {
                  currency: "mad",
                  product_data: {
                    name: req.body.user_id,
                  },
                  unit_amount: totalPrice * 100,
                },
                quantity: 1,
              },
            ],
            mode: "payment",
            success_url: `${req.protocol}://${req.get("host")}/cash`,
            cancel_url: `${req.protocol}://${req.get("host")}/cart`,
            // customer_email: req.user.email,
            // client_reference_id: req.params.cartId,
            metadata: req.body.shippingAddress,
          });
          var url = session.url;
          res.status(201).json({ status: "success", data: totalProducts ,TotalPrice : totalPrice ,url });
        } else {
          res.status(500).json({message : "order not found"}); 
        }
    } else {
        res.status(500).json({message : "user not found"}); 
    }    
    } catch (err) {
        console.error(err);
        res.status(500).send('Internal Server Error');
    }
};