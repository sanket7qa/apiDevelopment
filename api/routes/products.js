const express = require('express');
// Using as FUNCTION : Help us to route to different HTTP verbs 
const router = express.Router();
const mongoose = require('mongoose');
const Product = require('../models/product');


//Help to handle GET method
router.get('/',(req,res,next) => 
{
    res.status(200).json(
        {
            message: 'Handling GET request'
        }
    )
});

router.post('/',(req,res,next) => 
{
    //Middleware concept : Anything between request -> Response : Program/function/software entity
    console.log('Request from:' + req.originalUrl);
    req.root = req.protocol + '://' + req.get('host') + '/';
    next(); // If you remove this, request will never complete
}, (req,res, next) =>{

    const product = new Product(
        {
            _id: new mongoose.Types.ObjectId(),
            name: req.body.name,
            price: req.body.price
        }
    );
    //This is promise
    product
        .save()
        .then(result=>{
        console.log(result);
    })
    .catch(err => console.log(err));

    res.status(201).json(
        {
            message: 'Handling POST request',
            createProduct: product,
            created_date: Date.now(),
            reqDetails: req.root
        });
});

router.get('/:productId',(req, res, next) => {
    const id = req.params.productId;
    if(id==='special')
    {
        res.status(200).json(
            {
                message : 'Special ID',
                id:id
            });
    } else {
        res.status(200).json(
            {
                message: 'You passed an ID'
            });
    }
});

router.patch('/:productId',(req, res, next) => {
        res.status(203).json(
        {
            message : 'Product Updated',
            
        });
    });

    router.delete('/:productId',(req, res, next) => {
        res.status(203).json(
        {
            message : 'Product Deleted',
            
        });
    });


//This will export the routes and can be used in other files
module.exports =  router;