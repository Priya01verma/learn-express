const express = require('express');
const app = express();

app.get('/hello', function(req, res){
    res.send("Hello world!");
})

app.post('/hello', function(req, res){
    res.send("Hello world 2!");
})

// the all method provide by express to handle all types of http methods at a particular route using the same function. this method is generally used to define the middleware.
app.all('/test', function(req, res){
    res.send("HTTP method doesn't have any effect on this route");
})

app.listen(3003);