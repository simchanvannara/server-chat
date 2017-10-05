require('./config/config');
const _ = require('lodash');
const express = require('express');
const bodyParser = require('body-parser');
var cors = require('cors');

var {mongoose} = require('./db/mongoose');

const route = require('./routes/index');


var app = express()

const port = process.env.PORT || 3030

app.use(bodyParser.json())
app.use(cors())

app.use(
    route.todoRoute, 
    route.userRoute, 
    route.chatRoute
)

app.listen(port, () => {
    console.log(`started ${port}`);
});
module.exports = {app};

