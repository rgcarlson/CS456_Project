const express = require('express'); //import express
const morgan = require('morgan'); //import morgan for logging
const dao = require('./model/UserDaoMem');

let port = 4000;
let hostname = 'localhost';

const app = express(); //creates a new Express Application
app.use(morgan('dev')); //For better logging, we use morgan
app.use(express.urlencoded({extended:true}));
app.use(express.json());

app.use(express.static('public_html'));// Static server use the folder 'public_html'


app.get('/user',function(req,res){ // REST get (all) method
    res.status(200); // 200 = Ok
    res.send(dao.readAll()); //send the users back to the client
    res.end(); 
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

app.post('/user',function(req,res){
    let newuser = {}; //empty obj
    newuser.name = req.body.txt_name;
    newuser.login = req.body.txt_login;
    newuser.password = req.body.txt_pass;
    newuser.permission = parseInt(req.body.txt_perm);

    if(req.body.txt_id){
        //update user
        console.log('Update user');
        dao.update(newuser);
    }
    else{
        //insert user
        dao.create(newuser);        
    }
    res.redirect('users.html');
}); //end of app.post(user)

app.get('/deluser/:id',function(req,res){
    //URL parameter always on req.params.<name>
    let id = parseInt( req.params.id ); //get param and convert to int    
    
    dao.del(id);

    res.redirect('../users.html');
}); //end of app.get(deluser)

app.post('/updateuser',function(req,res){
    //Not being called, the front-end sends to the same function as the create new user

    let user = {}; // empty object
    user.name = req.body.txt_name; 
    user.login = req.body.txt_login; 
    user.password = req.body.txt_pass;
    user.permission = parseInt(req.body.txt_perm);
    user._id = parseInt(req.body.txt_id);
    for(let i=0; i<users.length; i++){//find the user
       if(users[i]._id===user._id){ users[i] = user; break; }
    }
    res.redirect('user.html'); // go to 'user.html'
}); // end of app.post(updateuser)


app.listen(port,hostname,function(){ // Listen to client requests in hostname:port
    console.log(`Server Running on ${hostname}:${port}...`);
});