const express = require('express');
const app = express();
// Logger purpose  Middlewear
const morgan = require('morgan');
const bodyParser = require('body-parser');

//import product routes
const productRoutes = require('./api/routes/products');
const orderRoutes = require('./api/routes/orders');

app.use(morgan('dev')); // Middleware for logging
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());

//Middleware : incoming request will pass to this
//anything that hit URL/product will goes to productRoutes from routes
app.use('/products',productRoutes);
app.use('/orders',orderRoutes); 

app.use((req,res,next) => 
{
    const error = new Error('Not Found');
    error.status = 404;
    next(error);
})

app.use((error,req,res, next) => 
{
    res.status(error.status || 500);
    res.json({
        error:{
            message: error.message
        }
    })
})

module.exports = app;