const dao = require('../model/UserDaoMem');

exports.getAll = function get(req, res){
    res.status(200);
    res.send(dao.readAll());
    res.end();
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