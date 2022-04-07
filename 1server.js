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

app.get('/contact',function( req,res){
    res.status(200); // ok status
    res.send(dao.readAll()); // sending array
    res.end(); // end response
});

app.get('/contact/:id',function(req,res){ //REST get (one) method
    //URL parameter always on req.params.<name>
    let id = parseInt( req.params.id ); //get param and convert to int
    let found = dao.read(id);

    if(found !== null){ //We found the requested user
        res.status(200); //200 = OK
        res.send(found); //Send the found user
    }
    else{ //The requested id does not exist
        res.status(404); //404 = Not Found
        res.send({msg:'Contact not found.'}); //send a message
    }
    res.end(); //ends the response (only 1 end per response)
}); //end of app.get(user/id)

app.get('/users',function( req,res){
    res.status(200); // ok status
    res.sendFile(__dirname + '/contacts.html'); // sending array
});

app.post('/contact',function(req,res,next){
    let newContact = {}; // empty object
    newContact.name = req.body.txt_name; 
    newContact.email = req.body.txt_email; 
    newContact.message = req.body.txt_message;
    console.log(newContact);
    // "generate" an id for the new user
    
    if(req.body.txt_id){
        //update user
        console.log('Update contact');
        dao.update(newContact);
    }
    else{
        //insert contact
        dao.create(newContact);        
    }
    
    messages = dao.readAll();
    console.log(JSON.stringify(messages));

    fs.writeFile("model/messages.json", JSON.stringify(messages), err =>{
        if (err) throw err;
    })
    
    res.redirect('contact.html');
}); //end of app.post(user)

app.get('/delContact/:id',function(req,res){
    //URL parameter always on req.params.<name>
    let id = parseInt( req.params.id ); //get param and convert to int    
    let contacts = dao.readAll();
    console.log(contacts);

    dao.del(1);
    res.redirect('../contact.html');
}); //end of app.get(deluser)

app.get('/updateContact',function(req,res){
    //Not being called, the front-end sends to the same function as the create new contact

    let contact = {}; // empty object
    contact.name = contact.body.txt_name;
    contact.email = req.body.txt_email; 
    contact.message = req.body.txt_message; 
    contact._id = parseInt(req.body.txt_id);
    
    dao.update(4,contact);
    res.redirect('contact.html'); // go to 'contact.html'
}); // end of app.post(updateuser)



app.listen(port, hostname,function(){
    console.log(`Server Running on ${hostname}:${port}...`);
});

console.log('test');