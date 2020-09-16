const express = require('express');
const middlewareExample = express();

//first middleware before response is sent
middlewareExample.use((req, res, next)=>{
    console.log("Start!!!");
    next();
})

//Route Handler
middlewareExample.get("/", (req, res, next) =>{
    res.send("Middle!!!");
    next();
});

middlewareExample.use('/', (req, res, next) =>{
    console.log("End!!!");
    next();
});
module.exports = middlewareExample;