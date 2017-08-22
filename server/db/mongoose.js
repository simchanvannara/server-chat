var mongoose = require('mongoose');

mongoose.Promise = global.Promise;
// console.log(process.env.MONGO_URI);
mongoose.connect(process.env.MONGO_URI, {
    useMongoClient: true
});
 
module.exports = {
    mongoose
}