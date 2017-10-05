var { User } = require('../models/user');

module.exports = {
    createUser:  (req, res) => {
        var body = _.pick(req.body, ['email', 'password']);
        var user = new User(body);
    
        user.save().then(() => {
            return user.generateAuthToken();
        }).then((token) => {
            res.header({ 'x-auth': token }).status(200).send(user);
        }).catch((err) => {
            res.status(400).send(err);
        });
    },
    getMe: (req, res) => {
        res.send(req.user);
    },
    login: (req, res) => {
        var body = _.pick(req.body, ['email', 'password']);
    
        User.findByCredentials(body.email, body.password).then((user) => {
            res.send(user);
        }).catch((e) => {
            res.status(400).send();
        });
    },
    deleteUser: (req, res) => {
        User.removeToken(req.token).then(() => {
            res.status(200).send();
        }, () => {
            res.status(400).send();
        })
    }
}