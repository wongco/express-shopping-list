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

/** this route should display a single item’s name and price. */
router.get('/:id', (req, res, next) => {
  const targetItem = cartItems.find(item => {
    // the plus coerces req.params.id into number
    return item.id == +req.params.id;
  });
  return res.json(targetItem);
});

/** this route should modify a single item’s name and/or price. */
router.patch('/:id', (req, res, next) => {
  const targetItem = cartItems.find(item => {
    return item.id == +req.params.id;
  });

  // update details of item in cartItems
  targetItem.name = req.body.item.name;
  targetItem.price = req.body.item.price;

  return res.json({
    message: 'Item details updated',
    item: targetItem
  });
});

/** this route should allow you to delete a specific item from the array. */
router.delete('/:id', (req, res, next) => {
  const targetIdx = cartItems.indexOf(item => {
    return item.id == +req.params.id;
  });

  const deletedItem = cartItems.splice(targetIdx, 1);

  return res.json({
    message: 'Item deleted from cart.',
    item: deletedItem
  });
});

/** 404 catch all for router */
router.use((req, res, next) => {
  const error = new Error('Resource could not be found.');
  error.status = 404;
  return next(error);
});

// exports router for app.js use
module.exports = router;
