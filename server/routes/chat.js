const Router = require('express');
var {Chat} = require('../models/chat');

const route = new Router();

route.post('/chats', (req, res) => {
    console.log(req.body);
    var body = _.pick(req.body, ['text', 'user_id']);
    var test = new Chat(body);

    test.save().then((success) => {
        res.status(200).send(success);
    }).catch((e) => {
        res.status(400).send(e);
    })
    
})

route.get('/chats', (req, res) => {
    Chat.find().then((chats) => {
        res.send(chats);
    });
})

module.exports = { chatRoute: route }
