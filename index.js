const express = require('express');
// when we are using form
const bodyParser = require('body-parser');
const multer = require('multer');
//------------------------
//we can use mongoose to create a models
const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/my_db');
//------------------------
const upload = multer();
const app = express();
const things = require('./things.js');
const dynamicRouting = require('./dynamicRouting');
const middlewareExapmle = require('./middlewareExample');

//if we can use cookies than we can use cookies parser for provide the middleware
const cookieParser = require('cookie-parser');
//------------------------

app.use(cookieParser());

//cookie-parser parses Cookie header and populates req.cookies with an object keyed by the cookie names.To set a new cookie,let us define a new route in your express app
app.get("/", (req, res) =>{
    res.cookie('name', 'express').send('cookie set'); // it sets name express

    //we can add cookies that expire. to add a cookie that expires, just pass an an object with property 'expire' set to the time when you want it to expire.For example:

    //Expires after 360000 ms from the time it is set..
    res.cookie(name, 'value', {expire: 360000 + Date.now()});
});

//to delete a cookie, use the clearCookie function. For example, if you need to clear a cookie named foo, use the following codes 
app.get('/clear_cookie_foo', (req, res) =>{
    res.clearCookie('foo');
    res.send('cookie foo cleared');
})

// we our app is connect to the database than we can create a new model. this model can actas a collection of a database. and it should be define before defining any route:---
// const personSchema = mongoose.Schema(
//     {
//         name: String,
//         age: Number,
//         nationality: String
//     }
// )

// const Person = mongoose.model("Person", personSchema);

//when pug is installed than we can add this lines of codes
// app.set('view engine', 'pug');
// app.set('views', './views');



// app.get("/person", (req, res) =>{
//     res.render('person');
// })

// app.get('/',(req,res) =>{
//     res.render('form');
// });

//for parsing application/json
//app.use(bodyParser.json());

//for parsing application/xwww-
// app.use(bodyParser.urlencoded({extended: true}));
//form-urlencoded


// app.post('/person', (req,res) =>{
//     let personInfo = req.body; // Get the parsed information
//     if(!personInfo.name || !personInfo.age || !personInfo.nationality){
//         res.render('show_message',{
//             message: 'Sorry, you provided wrong info', 
//             type: 'error'
//         });
//     }else{
//         let newPerson = new Person({
//             name: personInfo.name,
//             age: personInfo.age,
//             nationality: personInfo.nationality
//         });
//         newPerson.save((err, Person) =>{
//             if(err){
//                 res.render('show_message',{
//                     message: 'Database error',
//                     type: 'error'
//                 })
//             }
//             else
//             res.render('show_message',{
//                 message: 'New Person added',
//                 type: 'success',
//                 person: personInfo 
//             })
//         })
//     }
// })

// for parsing multipart/form-data
// app.use(upload.array());
// app.use(express.static('public'));

// app.post('/', (req, res)=>{
//     console.log(req.body);
//     res.send("received your request!!");
// })

// app.get('/hello', function(req, res){
//     res.send("Hello world!");
// })

// app.post('/hello', function(req, res){
//     res.send("Hello world 2!");
// })

// the all method provide by express to handle all types of http methods at a particular route using the same function. this method is generally used to define the middleware.
// app.all('/test', function(req, res){
//     res.send("HTTP method doesn't have any effect on this route");
// })

//both index.js and things.js should be in same directory
// app.use('/things', things);

// app.use('/dynamicRouting', dynamicRouting);
// app.use('/', middlewareExapmle);


//if we want to allow to serve static files. than we need to enable it using the following built-in middleware
//we can also set multiple static assets directories using the following programs---
// app.use(express.static('public'));
// app.use(express.static('images'));


//if we want to run pug page than we have to do
// app.get('/first_template', (req, res) =>{
//     res.render("first_view");
// })


//if we want to pass value to the pug template
// app.get('/dynamic_view', (req,res)=>{
//     res.render('dynamic',{
//         name: 'TutorialsPoints',
//         url: 'http://www.tutorialspoint.com'
//     });
// });

//if we want to add conditions in our pug template
// app.get('/dynamic_view', (req, res) =>{
//     res.render('dynamic',{user: {name: 'Priya', age : '24'}});
// })

//content related pug
// app.get('/content_page', (req, res) =>{
//     res.render("content");
// })

// app.get('/static_file_serving', (req, res) =>{
//     res.render("static_file_serving");
// })

//if we want to replace the default error by other error like page not found etc. then we have to do  important thing is that it should be placed after all your routes, as express matches matches routes from start to end of pindex.js, including expternal router are required.
app.get('*',(req,res) =>{
    res.send('Sorry, this is an invalid URL');
})

//app.get('')
app.listen(3003);

//following are the command that we need to write in mongodb
// mongod.exe --dbpath "C:\data" and second command is: mongo.exe