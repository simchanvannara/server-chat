var mongoose = require('mongoose');

mongoose.Promise = global.Promise;
// console.log(process.env.MONGO_URI);
mongoose.connect(process.env.MONGO_URI || 'mongodb://simon:123456@ds023463.mlab.com:23463/simon-todos', {
    useMongoClient: true
});
 
module.exports = {
    mongoose
}