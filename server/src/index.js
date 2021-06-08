const express = require('express');
const cors = require('cors');
const razorpay = require('razorpay');

const { products } = require('./data');

const app = express();

app.use(cors());

app.get('/products', (req, res) =>{
    res.status(200).json(products);
})

app.listen(8000, ()=>{
    console.log('Server is listening on port' + 8000);
})