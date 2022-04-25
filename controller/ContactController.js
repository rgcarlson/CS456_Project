const dao = require('../model/ContactDaoMem');

exports.getAll = function get(req, res){
    res.status(200);
    res.send(dao.readAll());
    res.end();
}

exports.get = function(req,res){ //REST get (one) method
    //URL parameter always on req.params.<name>
    let id = req.params.id; //get param and convert to int
    let found = dao.read(id);

    if(found !== null){ //We found the requested contact
        res.status(200); //200 = OK
        res.send(found); //Send the found user
    }
    else{ //The requested id does not exist
        res.status(404); //404 = Not Found
        res.send({msg:'Contact not found.'}); //send a message
    }
    res.end(); //ends the response (only 1 end per response)
}

exports.postCreateOrUpdate = function(req,res){
    let newContact = {}; //empty obj
    newContact.name = req.body.txt_name;
    newContact.login = req.body.txt_login;
    newContact.password = req.body.txt_pass;
    newContact.permission = parseInt(req.body.txt_perm);

    if(req.body.txt_id){
        //update user
        console.log('Update contact');
        dao.update(newContact);
    }
    else{
        //insert user
        dao.create(newContact);        
    }
    res.redirect('contact.html');
}; //end of app.post(user)

exports.deleteOne = function(req,res){
    //URL parameter always on req.params.<name>
    let id = parseInt( req.params.id ); //get param and convert to int    
    
    dao.del(id);

    res.redirect('../contact.html');
}; //end of app.get(deluser)

exports.loggedContact = function(req,res){
    res.status(200); // 200 = Ok
    res.send( req.session.contact ); //send the logged user
    res.end(); 
}