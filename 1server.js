const express = require('express');// import express
const morgan = require('morgan'); //import morgan for logging
const http = require('http');
const dao = require('./model/UserDaoMem');
const fs = require('fs'); //file system

let hostname = 'localhost';
let port = 4000;

console.log(__dirname)

const app = express();
app.use(morgan('dev')); //logging
app.use(express.urlencoded({extended: true}));
app.use(express.json());

app.use(express.static('public_html'));

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
    res.send(dao.readAll()); // sending array
    res.end(); // end response
});

app.get('/user/:id',function(req,res){ //REST get (one) method
    //URL parameter always on req.params.<name>
    let id = parseInt( req.params.id ); //get param and convert to int
    let found = dao.read(id);

    if(found !== null){ //We found the requested user
        res.status(200); //200 = OK
        res.send(found); //Send the found user
    }
    else{ //The requested id does not exist
        res.status(404); //404 = Not Found
        res.send({msg:'User not found.'}); //send a message
    }
    res.end(); //ends the response (only 1 end per response)
}); //end of app.get(user/id)

app.get('/users',function( req,res){
    res.status(200); // ok status
    res.sendFile(__dirname + '/users.html'); // sending array
});

app.post('/contact',function(req,res,next){
    let newuser = {}; // empty object
    newuser.name = req.body.txt_name; 
    newuser.email = req.body.txt_email; 
    newuser.message = req.body.txt_message;
    // "generate" an id for the new user
    
    if(req.body.txt_id){
        //update user
        console.log('Update user');
        dao.update(newuser);
    }
    else{
        //insert user
        dao.create(newuser);        
    }
    
    messages = dao.readAll();
    fs.writeFile("messages.json", JSON.stringify(messages), err =>{
        if (err) throw err;
    })
    
    res.redirect('contact.html');
}); //end of app.post(user)

app.listen(port, hostname,function(){
    console.log(`Server Running on ${hostname}:${port}...`);
});

console.log('test');