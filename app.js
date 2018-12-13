const express = require('express');
const app = express();
const morgan = require('morgan');

const itemsRoutes = require('./routes/items');

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
//  router middleware - apply a prefix to every route in itemsRoutes

app.use(morgan('tiny'));

app.use('/items', itemsRoutes);

/** 404 catch all */
app.use((req, res, next) => {
  const error = new Error('Resource could not be found.');
  error.status = 404;
  return next(error);
});

/** error handler */
app.use((err, req, res, next) => {
  // the default status is 500 Internal SVR Error if status code was unset
  const status = err.status || 500;

  // set the status and alert the user
  return res.status(status).json({
    error: {
      message: err.message,
      status
    }
  });
});

module.exports = app;
