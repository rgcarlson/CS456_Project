
exports.users = require("./messages");

exports.readAll = function(){
    return exports.users;
}

exports.read = function( id ){
    let index = pos(id);
    if(index >= 0 ) return exports.users[index];
    else return null;
}

exports.create = function( newUser){
    if( exports.users.length > 0)
        newUser._id = (exports.users[ exports.users.length-1]._id) + 1
    else
        newUser._id = 1;
    exports.users.push(newUser);

}

exports.del = function( id ) {
    let index = pos(id);
    let deletedUser = null;
    if( index >= 0)
    {
        exports.users.splice(index,1);
    }
}

exports.update = function(id,newUser){
    //leave for homework
    if( exports.users.length > 0){
        let index = pos(id);
        exports.users[ index ] = exports.create(newUser);
    }
    else
        newUser._id = 1;
    exports.users.push(newUser);
}

function pos(id){
    for( let i=0; i<exports.users.length; i++){
        if( exports.users[i]._id === id){
            //found the user with id
            return i;
        }
    }

    return null;

}