const express = require('express');
const router = new express.Router();

const cartItems = [
  {
    id: 1,
    name: 'Chocolate Cookies',
    price: 3.25
  },
  {
    id: 2,
    name: 'SnickerDoodle',
    price: 3.5
  }
];

/** this should render a list of shopping items. */
router.get('/', (req, res, next) => {
  return res.json({
    cartItems
  });
});

/** this route should accept form data and add it to the shopping list. */
router.post('/', (req, res, next) => {
  const item = req.body.item;
  cartItems.push(item);
  return res.json({
    message: 'Item added to cart.',
    item
  });
});

/** middleware for route to check that id is valid */
router.use('/:id', (req, res, next) => {
  let targetIdx = cartItems.findIndex(item => {
    return item.id === +req.params.id;
  });

  if (targetIdx === -1) {
    const error = new Error('Resource could not be found.');
    error.status = 404;
    return next(error);
  }
  return next();
});

/** this route should display a single item’s name and price. */
router.get('/:id', (req, res, next) => {
  const targetItem = cartItems.find(item => {
    // the plus coerces req.params.id into number
    return item.id === +req.params.id;
  });

  return res.json(targetItem);
});

/** this route should modify a single item’s name and/or price. */
router.patch('/:id', (req, res, next) => {
  const targetItem = cartItems.find(item => {
    return item.id === +req.params.id;
  });

  // checks for blank name
  if (!req.body.item.name) {
    const error = new Error('Name cannot be blank.');
    error.status = 400;
    return next(error);
  }
  // checks if patch price is too high
  if (req.body.item.price > 5) {
    const error = new Error('Price is too high. Must be lower than 5.00');
    error.status = 400;
    return next(error);
  }
  // update details of item in cartItems
  targetItem.name = req.body.item.name;
  targetItem.price = req.body.item.price;

  return res.json({
    message: 'Item details updated.',
    item: targetItem
  });
});

/** this route should allow you to delete a specific item from the array. */
router.delete('/:id', (req, res, next) => {
  const targetIdx = cartItems.findIndex(item => {
    return item.id === +req.params.id;
  });

  const deletedItem = cartItems.splice(targetIdx, 1);

  return res.json({
    message: 'Item deleted from cart.',
    item: deletedItem
  });
});

// exports router for app.js use
module.exports = router;
