const { Todo } = require('../models/todo');

module.exports = {
    createTodo: (req, res) => {
        console.log(req.body);
        var todo = new Todo({
            text: req.body.text
        });

        todo.save().then((success) => {
            res.status(200).send(success);
        }, (err) => {
            res.status(400).send(err);
        });
    },
    getTodo: (req, res) => {
        Todo.find().then((todos) => {
            res.send({
                todos
            });
        }), (err) => {
            res.status(400).send(err);
        };
    },
    getTodoDetail: (req, res) => {
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
    },
    deleteTodo: (req, res) => {
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
    },
    editTodo: (req, res) => {
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

        Todo.findByIdAndUpdate(id, { $set: body }, { new: true }).then((todo) => {
            if (!todo) {
                return res.status(404).send();
            }

            res.send({ todo });
        }).catch((e) => {
            return res.status(404).send();
        });
    }
}