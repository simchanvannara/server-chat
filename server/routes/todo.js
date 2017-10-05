const { Router } = require('express');

const { ObjectID } = require('mongodb');

const todoController = require('../controllers/todo');

const route = new Router();

route.post('/todos', todoController.createTodo);

route.get('/todos', todoController.getTodo);

route.get('/todos/:id', todoController.getTodoDetail);

route.delete('/todos/:id', todoController.deleteTodo);

route.patch('/todos/:id', todoController.editTodo);

module.exports = { todoRoute: route }