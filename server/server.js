require('./config/config');
const _ = require('lodash');
const express = require('express');
const bodyParser = require('body-parser');
const {ObjectID} =require('mongodb');
var cors = require('cors');

var {mongoose} = require('./db/mongoose');
var {Todo} = require('./models/todo');
var {User} = require('./models/user');
var {Chat} = require('./models/chat');

var {authenticate} = require('./middleware/authenticate');

var app = express()
const port = process.env.PORT || 3030

app.use(bodyParser.json())
app.use(cors())

var server = require('http').createServer(app);
var io = require('socket.io')(server);

io.on('connection', function(socket){ 
    // console.log(client);
    socket.on('chat-send', function(req, res){
        console.log(req)
    })
});

app.get('/socket.io', (req, res)=>{res.send('hi')})
app.post('/todos', (req, res) => {

    console.log(req.body);
    var todo = new Todo({
        text: req.body.text
    });

    todo.save().then((success) => {
        res.status(200).send(success);
    }, (err) => {
        res.status(400).send(err);
    });
});

app.get('/todos', (req, res) => {
    console.log('============', req.headers);
    Todo.find().then((todos) => {
        res.send({
            todos
        });
    });
}, (err) => {
    res.status(400).send(err);
});

app.get('/todos/:id', (req, res) => {
    var id = req.params.id;

    if (!ObjectID.isValid(id)) {
        return res.status(404).send();
    }

    Todo.findById(id).then((todo) => {
        if (!todo) {
            return res.status(404).send();
        }
        res.send({ todo });
    }).catch((err) => {
        res.status(400).send();
    });
});

app.delete('/todos/:id', (req, res) => {
    var id = req.params.id;

    if (!ObjectID.isValid(id)) {
        return res.status(404).send();
    }

    Todo.findByIdAndRemove(id).then((todo) => {
        if (!todo) {
            return res.status(404).send();
        }
        res.send({ todo });
    }).catch((err) => {
        res.status(400).send();
    });
});

app.patch('/todos/:id', (req, res) => {
    console.log(111111);
    var id = req.params.id;
    var body = _.pick(req.body, ['text', 'completed']);

    if (!ObjectID.isValid(id)) {
        return res.status(404).send();
    }

    if (_.isBoolean(body.completed) && body.completed) {
        body.completedAt = new Date().getTime();
    } else {
        body.completed = false;
        body.completedAt = null;
    }

    Todo.findByIdAndUpdate(id, {$set: body}, {new: true}).then((todo)=>{
        if (!todo) {
            return res.status(404).send();
        }

        res.send({todo});
    }).catch((e)=>{
        return res.status(404).send();
    });
});

app.post('/users', (req, res) => {
    var body = _.pick(req.body, ['email', 'password']);
    var user = new User(body);

    user.save().then(() => {
        return user.generateAuthToken();
    }).then((token) => {
        res.header({ 'x-auth': token }).status(200).send(user);
    }).catch((err) => {
        res.status(400).send(err);
    });
});

app.get('/users/me', authenticate, (req, res) => {
    res.send(req.user);
});

app.post('/users/login', (req, res) => {
    var body = _.pick(req.body, ['email', 'password']);

    User.findByCredentials(body.email, body.password).then((user) => {
        res.send(user);
    }).catch((e) => {
        res.status(400).send();
    });
    // res.send(body);
});

app.delete('/users/me/token', authenticate, (req, res) => {
    
    User.removeToken(req.token).then(() => {
        res.status(200).send();
    }, () => {
        res.status(400).send();
    })
})

app.post('/chats', (req, res) => {
    console.log(req.body);
    var body = _.pick(req.body, ['text', 'user_id']);
    var test = new Chat(body);

    test.save().then((success) => {
        res.status(200).send(success);
    }).catch((e) => {
        res.status(400).send(e);
    })
    
})

app.get('/chats', (req, res) => {
    Chat.find().then((chats) => {
        res.send(chats);
    });
})
server.listen(3001);
app.listen(port, () => {
    console.log(`started ${port}`);
});
module.exports = {app};