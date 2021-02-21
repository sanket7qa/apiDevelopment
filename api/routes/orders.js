const express = require('express');
// Using as FUNCTION : Help us to route to different HTTP verbs 
const router = express.Router();

router.get('/',(req,res,next) =>
{
    res.status(200).json(
        {
            message : "Orders were fetched"
        });
});

router.post('/',(req,res,next) =>
{
    const order = {
        productId: req.body.productId,
        quantity: req.body.quantity
    };
       res.status(201).json(
        {
            message : "Orders are creted",
            createdOrder: order,
            created_date: Date()
        });
});                            

router.get('/:orderId',(req,res,next) =>
{
    res.status(200).json(
        {
            message : "Orders details",
            orderId: req.params.orderId
        });
});

router.delete('/:orderId',(req,res,next) =>
{
    res.status(200).json(
        {
            message : "Orders deleted",
            orderId: req.params.orderId
        });
});

//This will export the routes and can be used in other files
module.exports =  router;