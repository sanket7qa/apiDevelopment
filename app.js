const express = require('express');
const app = express();

//import product routes
const productRoutes = require('./api/routes/products');
const orderRoutes = require('./api/routes/orders');

//Middleware : incoming request will pass to this
//anything that hit URL/product will goes to productRoutes from routes.js
app.use('/products',productRoutes);
app.use('/orders',orderRoutes);

module.exports = app;