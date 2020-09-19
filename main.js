const express =require('express');
const bodyParser = require('body-parser');
const multer = require('multer');
const cookieParser = require('cookie-parser');
const upload = multer();
const app = express();

app.use(cookieParser());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
app.use(upload.array());

//we can create a restful api (movie api) by using the express
//Require the Router we defined in movies.js
let movies = require('./movies.js');

//use the router on the sub route /movies
app.use('/movies', movies);

app.listen(3003);