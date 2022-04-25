const dbcon = require('../model/DbConnection');
const dao = require('../model/ContactDaoMongo');

beforeAll(function(){
    dbcon.connect('test');
});
afterAll(async function(){
    await dao.deleteAll();
    dbcon.disconnect();
});
beforeEach(async function(){
    await dao.deleteAll();
});

test('Create new contact test',async function(){
    let newdata = {name:'Test',login:'test@test.com',
                  password:'123456',permission:1};
    let created = await dao.create(newdata);
    let found = await dao.read(created._id);
    expect(created.login).toBe(found.login); //assertion
});

test('Read All', async function(){
    expect(dao.readAll()).toBe(exports.contacts);
});