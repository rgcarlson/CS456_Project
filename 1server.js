const express = require('express');// import express
const morgan = require('morgan'); //import morgan for logging
const http = require('http');
const fs = require('fs'); //file system

let hostname = 'localhost';
let port = 4000;

console.log(__dirname)

const app = express();
app.use(morgan('dev')); //logging

app.use(express.static('public_html'));

const users = [
    {_id:1,name:'Gil Carlson',login:'rgcarlson@loyola.edu',permission:1}, 
    {_id:2,name:'John Doe', login:'jd@aol.com', password:'123456', permission:2},
    {_id:3,name:'Jane Doe', login:'janed@compuserve.com' ,password:'123456', permission:2}];

app.get('/home',function( req,res){
    res.status(200); // ok status
    res.sendFile(__dirname + '/assignment1.html'); // sending File
});

app.get('',function( req,res){
    res.status(200); // ok status
    res.sendFile(__dirname + '/assignment1.html'); // sending File
});

app.get('/user',function( req,res){
    res.status(200); // ok status
    res.send(users); // sending array
    res.end(); // end response
});

app.listen(port, hostname,function(){
    console.log(`Server Running on ${hostname}:${port}...`);
});

console.log('test');