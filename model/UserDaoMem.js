
exports.contacts = require("./messages");

exports.readAll = function(){
    return exports.contacts;
}

exports.read = function( id ){
    let index = pos(id);
    if(index >= 0 ) return exports.contacts[index];
    else return null;
}

exports.create = function( newContact){
    if( exports.contacts.length > 0)
        newContact._id = (exports.contacts[ exports.contacts.length-1]._id) + 1
    else
        newContact._id = 1;
    exports.contacts.push(newContact);

}

exports.del = function( id ) {
    let index = pos(id);
    let deletedContact = null;
    if( index >= 0)
    {
        exports.contacts.splice(index,1);
    }
}

exports.update = function(id,newContact){
    if( exports.contacts.length > 0){
        let index = pos(id);
        exports.contacts[id-1] = newContact;
    }
    else
        newContact._id = 1;
}

function pos(id){
    for( let i=0; i<exports.contacts.length; i++){
        if( exports.contacts[i]._id === id){
            //found the user with id
            return i;
        }
    }

    return null;

}