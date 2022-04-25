const dao = require('../model/ContactDaoMem');

test('Contact readAll() Test', function(){
   expect(dao.readAll().length).toBeGreaterThan(0);
});

test('Contact read() Test', function(){
   let newdata = {_id:99,name:"New Contact",login:"n@n.com"};
   dao.create(newdata);
   expect(dao.read(8)).toBe(newdata);
});

test('Create Contact Test', function(){
   let newdata = {_id:0,name:"New Contact",login:"n@n.com"};
   let size = dao.contacts.length;
   dao.create(newdata);
   expect(dao.contacts.length).toBe(size + 1);
   expect(dao.contacts).toContain(newdata);
});

test('Delete Contact Test', function(){
   let size = dao.contacts.length;
   dao.del(1);
   expect(dao.contacts.length).toBe(size - 1);
});

test('Update Contact Test', function(){
   let newdata = {_id:1,name:"New Contact",login:"n@n.com"};
   let size = dao.contacts.length;
   dao.update(1,newdata);
   expect(dao.contacts.length).toBe(size);
   expect(dao.contacts).toContain(newdata);
});
