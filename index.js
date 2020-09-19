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

//if we can use session than we can use both session and cookies as a middleware and cookies is defiend above and session is below :---
const session = require('express-session');
//-----------------------

const router = require('./things.js');


app.use(cookieParser());
app.use(session({secret: 'Shh, its a secret!!!'}));


//when pug is installed than we can add this lines of codes
app.set('view engine', 'pug');
app.set('views', './views');


//for parsing application/json
app.use(bodyParser.json());

//for parsing application/xwww-
app.use(bodyParser.urlencoded({extended: true}));
//form-urlencoded

// for parsing multipart/form-data
app.use(upload.array());
app.use(express.static('public'));

let Users = [];



//For authentication we can create signup form
app.get('/signup', (req, res) =>{
    res.render('signup');
});

app.post('/signup', (req, res) =>{
    if(!req.body.id || !req.body.password){
        res.status('400');
        res.send('Invalid Details!');
    }else{
        Users.filter((user)=>{
            if(user.id === req.body.id){
                res.render('signup',{
                    message: 'User Already Exists! Login or choose another user id'
                });
                let newUser = {id: req.body.id, password: req.body.password};
                Users.push(newUser);
                req.session.user = newUser;
                res.redirect('/protected_page');
            }
        })
    }
});

function checkSignIn(req, res){
    if(req.session.user){
        next(); // If session exists, proceed to page
    }else{
        let err = new Error('Not logged in!');
        console.log(req.session.user);
        next(err);
    }
}

app.get('/protected_page', checkSignIn, function(req, res){
    res.render('protected_page', {
        id: req.session.user.id
    })
});


app.get('/login', (req,res) =>{
    res.render('login');
});

app.post('/login', function(req, res){
    console.log(Users);

    if(!req.body.id || !req.body.password){
        res.render('login',{ message :  "please enter both id and password"})
    }else{
        Users.filter((user) =>{
            if(user.id === req.body.id && user.password === req.body.password){
                req.session.user = user;
                res.redirect('/protected_page');
            }
        });
        res.render('login', {message : 'Invalid credentials@'})
    }
});

app.get('/logout', (req, res) =>{
    req.session.destroy(() =>{
        console.log("user logged out.");
    });
    res.redirect('login')
})

app.use('/protected_page', (err, req, res, next) =>{
    console.log(err);
    //User should be authenticated! Redirect him to log in.
    res.redirect('login');
});


//whenever we make a request from the same client again, we will have their session information stored with us(given that the server was not started). we can add more properties to the session object.In the following example, we will create a view counter for a client.

// app.get('/', (req,res) =>{
//     if(req.session.page_views){
//         req.session.page_views++;
//         res.send('You visited this page ' + req.session.page_views + 'times');
//     }else{
//         req.session.page_views = 1;
//         res.send('Welcome to this page for the first time!!!');
//     }
// })




//cookie-parser parses Cookie header and populates req.cookies with an object keyed by the cookie names.To set a new cookie,let us define a new route in your express app
// app.get("/", (req, res) =>{
//     res.cookie('name', 'express').send('cookie set'); // it sets name express

//     //we can add cookies that expire. to add a cookie that expires, just pass an an object with property 'expire' set to the time when you want it to expire.For example:

//     //Expires after 360000 ms from the time it is set..
//     res.cookie(name, 'value', {expire: 360000 + Date.now()});
// });

//to delete a cookie, use the clearCookie function. For example, if you need to clear a cookie named foo, use the following codes 
// app.get('/clear_cookie_foo', (req, res) =>{
//     res.clearCookie('foo');
//     res.send('cookie foo cleared');
// })

// we our app is connect to the database than we can create a new model. this model can actas a collection of a database. and it should be define before defining any route:---
// const personSchema = mongoose.Schema(
//     {
//         name: String,
//         age: Number,
//         nationality: String
//     }
// )

// const Person = mongoose.model("Person", personSchema);



// app.get("/person", (req, res) =>{
//     res.render('person');
// })

// app.get('/',(req,res) =>{
//     res.render('form');
// });



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