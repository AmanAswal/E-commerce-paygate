const express = require('express');
const cors = require('cors');
const Razorpay = require('razorpay');

const { products } = require('./data');

const app = express();

app.use(cors());
app.use(express.json());

// razorpay instance
const key_id = 'rzp_test_eEejfbbfnunXC1';
const key_secret = '6PJjWXdL2PRZ0Drrr5Kkgmcp';
const instance = new Razorpay({
    key_id: key_id,
    key_secret: key_secret
});

app.get('/products', (req, res) => {
    res.status(200).json(products);
})

app.get('/order/:productId', (req, res) => {
    const { productId } = req.params;
    const product = products.find(product => product.id == productId);
    const amount = product.price * 100 * 70;
    const currency = "INR";
    const receipt = 'receipt';
    const notes = { desc: product.description };

    instance.orders.create({ amount, currency, receipt, notes }, (error, order) => {
        if (error) {
            return res.status(500).json(error);
        }
        return res.status(200).json(order);
    })
});

app.post(`/verify/razorpay-signature`, (req, res) => {
    console.log(JSON.stringify(req.body));

    const crypto = require('crypto');
    const sha256 = crypto.createHash('HMAC-SHA256', 'imamanxd11').update(JSON.stringify(req.body)).digest("hex");

    console.log(hash);
    console.log(req.headers["x-razorpay-signature"]);
    if(hash === req.headers["x-razorpay-signature"]){
        // save payment info in DB for future reference
    }
    else{
        // decline payment
    }
    res.status(200);
});

app.listen(8000, () => {
    console.log('Server is listening on port' + 8000);
})