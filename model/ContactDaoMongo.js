// Call DBConnection on the Server.js
const mongoose = require('mongoose');

const contactSchema = new mongoose.Schema({
    name: String,
    login: { type:String, alias:'email', required:true },
    password: String,
    permission: Number,
    creation: { type:Date, default:Date.now } 
});

const contactModel = mongoose.model('contact',userSchema);

exports.readAll = async function(){
    let contacts = await contactModel.find();
    // Later try: find().sort({name:'asc'}).skip(0).limit(5);
    return contacts;
}

exports.read = async function(id){
    let contact = await contactModel.findById(id);
    return contact;
}

exports.create = async function(newcontact){
    const contact = new contactModel(newcontact);
    await contact.save();
    return contact;
}

exports.del = async function(id){
    let contact = await contactModel.findByIdAndDelete(id);
    return contact;
} 

exports.deleteAll = async function(){
    await contactModel.deleteMany();
}

exports.update = function(contact, id){
    var updateContact = {
        name: contact.name,
        email: contact.email,
        message: contact.message,
        _id: contact._id,
    };
    return contacts.update(update, { where: { id: id } });
}

exports.login = async function(plogin, pwd){
    let contact = await contactModel.findOne({login:plogin, password:pwd});
    return contact;
}