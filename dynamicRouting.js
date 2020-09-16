const express = require('express');
const dynamicRoute = express();

// dynamicRoute.get('/:id',(req,res) =>{
//     res.send('the id that you specified is: ' + req.params.id);
// })

// dynamicRoute.get('/:name/:id',(req,res) =>{
//     res.send('the id that you specified is: ' + req.params.id + " and name: " + req.params.name);
// })

//if we want that the id contain 5-digit longer number we can use regex to restrict URL parameter matching

dynamicRoute.get('/:id([0-9]{5})',(req, res) =>{
    res.send("id: " + req.params.id);
})

module.exports = dynamicRoute;
