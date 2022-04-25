const express = require('express'); //import express
const morgan = require('morgan'); //import morgan for logging
const session = require('express-session');
const memorystore = require('memorystore')(session);
const contactCont = require('./controller/ContactController');

const app = express(); //creates a new Express Application
app.use(morgan('dev')); //For better logging, we use morgan
app.use(express.urlencoded({extended:true}));
app.use(express.json());

app.use(session({
    secret: 'Pineapple - Guava - Orange',
    cookie: {maxAge: 86400000 }, // = 1000*60*60*24 = 24Hours
    store: new memorystore({ checkPeriod:86400000 }),
    resave: false,
    saveUninitialized: true
}));

app.use(express.static('view/build'));// Static server use the folder 'public_html'
app.use(express.static('public_html'));// Static server use the folder 'public_html'

// Contact Actions
app.get('/contact', contactCont.getAll );
app.get('/contact/:id',contactCont.get );
app.post('/contact',contactCont.postCreateOrUpdate); 
app.get('/delcontact/:id',contactCont.deleteOne); 
app.post('/updatecontact',contactCont.postCreateOrUpdate);
app.get('/loggedContact',contactCont.loggedContact);

// Example Actions
//app.get('/example', exCont.getAll);

exports.app = app;