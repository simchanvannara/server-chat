var mongoose = require('mongoose');

mongoose.Promise = global.Promise;

mongoose.connect('mongodb://simon:123456@ds023463.mlab.com:23463/simon-todos', {
    useMongoClient: true
});
 
module.exports = {
    mongoose
}