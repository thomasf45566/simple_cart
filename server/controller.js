const { Products } = require('../database');
const { products, cart } = require('./seedData');
/*
  By storing the cart on the server:
  1. it allows users to access their cart on any device
  2. allows us to send notification to users reminding them to checkout
  (Further implementation: Store carts in the DB based on user accounts)
*/

const controller = {
  getProducts: (req, res) => {
    res.status(200).send(products);
  },
  getCart: (req, res) => {
    res.status(200).send(cart);
  },
  addItem: (req, res) => {
    const id = req.params.itemID;
    cart[id] = cart[id] + 1 || 1;
    res.status(201).send(`Successfully added item ${id}!`);
  },
  reduceItem: (req, res) => {
    const id = req.params.itemID;
    cart[id]--;
    if (cart[id] <= 0) {
      delete cart[id];
    }
    res.status(202).send(`Successfully reduced item ${id}!`);
  },
  changeItem: (req, res) => {
    const id = req.params.itemID;
    const num = req.body.num;
    if (num <= 0) {
      delete cart[id];
    } else {
      cart[id] = num;
    }
    res.status(202).send(`Successfully changed # of item ${id} to ${num}!`);
  },
  removeItem: (req, res) => {
    const id = req.params.itemID;
    delete cart[id];
    res.status(202).send(`Successfully removed item ${id}!`);
  },
};

module.exports = controller;