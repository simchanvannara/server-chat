
const Router = require('express');
const userController = require('../controllers/user');
var {authenticate} = require('../middleware/authenticate');

const route = Router();

route.post('/users', userController.createUser);

route.get('/users/me', authenticate, userController.getMe);

route.post('/users/login',userController.login);

route.delete('/users/me/token', authenticate, userController.deleteUser)

module.exports = { userRoute: route }