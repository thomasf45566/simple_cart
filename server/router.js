const router = require('express').Router();
const controller = require('./controller');

router.route('/products')
  .get(controller.getProducts);

router.route('/cart')
  .get(controller.getCart);

router.route('/cart/add/:itemID')
  .put(controller.addItem);

router.route('/cart/reduce/:itemID')
  .put(controller.reduceItem);

router.route('/cart/change/:itemID')
  .put(controller.changeItem);

router.route('/cart/remove/:itemID')
  .delete(controller.removeItem);

module.exports = router;