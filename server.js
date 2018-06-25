const express = require('express');
const hbs = require('hbs');
const fs = require('fs');
var app = express();
const port = process.env.PORT || 3000;


hbs.registerPartials(__dirname + '/views/partials');
app.set('view engine','hbs');


app.use((req,res,next) => {
var now = new Date().toString();
var log = `${now}: ${req.method} ${req.url} `;
console.log(log);
fs.appendFile('server.log',log + '\n',(err) => {
    if(err){
      console.log('unable to append to server.log');
    }
});
next();
});

// app.use((req,res,next) => {
//     res.render('maintanence.hbs');


// })

app.use(express.static(__dirname + '/public'));

hbs.registerHelper('getCurrentYear',() => {
    return new Date().getFullYear();
});

hbs.registerHelper('screamIt',(text) => {
    return text.toUpperCase();
})


app.get('/',(req,res) => {
   // res.send('<h1>Hello Express!!</h1>');
   res.render('home.hbs',
       {
           pageTitle: 'HOME PAGE',
           currentYear:new Date().getFullYear(),
           welcomeMessage: 'Welcome to my website'
             }
   )
});

app.get('/about',(req,res) => {
    res.render('about.hbs',{
        pageTitle:'About page',
        currentYear: new Date().getFullYear()
    });
})

app.get('/projects',(req,res) => {
    res.render('projects.hbs',{
        pageTitle: 'projects'
    });
});

app.get('/bad',(req,res) => {
    res.send({
        errorMessage:'unable to handle request'
    });
})
app.listen(port,() => {
    console.log(`server is up on port number ${port}`);
});