const express = require('express');
const app = express();
const things = require('./things.js');
const dynamicRouting = require('./dynamicRouting');
const middlewareExapmle = require('./middlewareExample');

//when pug is installed than we can add this lines of codes
app.set('view engine', 'pug');
app.set('views', './views');


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

//both index.js and things.js should be in same directory
app.use('/things', things);

app.use('/dynamicRouting', dynamicRouting);
app.use('/', middlewareExapmle);


//if we want to run pug page than we have to do
app.get('/first_template', (req, res) =>{
    res.render("first_view");
})


//if we want to pass value to the pug template
app.get('/dynamic_view', (req,res)=>{
    res.render('dynamic',{
        name: 'TutorialsPoints',
        url: 'http://www.tutorialspoint.com'
    });
});

//if we want to add conditions in our pug template
app.get('/dynamic_view', (req, res) =>{
    res.render('dynamic',{user: {name: 'Priya', age : '24'}});
})

//content related pug
app.get('/content_page', (req, res) =>{
    res.render("content");
})

//if we want to replace the default error by other error like page not found etc. then we have to do  important thing is that it should be placed after all your routes, as express matches matches routes from start to end of pindex.js, including expternal router are required.
app.get('*',(req,res) =>{
    res.send('Sorry, this is an invalid URL');
})

//app.get('')
app.listen(3003);