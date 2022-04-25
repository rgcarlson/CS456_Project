const express = require('express');// import express
const morgan = require('morgan'); //import morgan for logging
const http = require('http');
const dao = require('./model/ContactDaoMem');
const fs = require('fs'); //file system

const contactCont = require('./controller/ContactController');
const app = require('./app.js');

let hostname = 'localhost';
let port = 4000;

app.get('/contact',contactCont.getAll);
app.get('/contact/:id', contactCont.getById);
app.post('/contact', contactCont.postCreateOrUpdate);
app.post('/updatecontact', contactCont.postCreateOrUpdate);
app.put('/contact', contactCont.postCreateOrUpdate);
app.delete('/contact/:id', contactCont.remove);
app.get('/deleteContact/:id', contactCont.remove);
