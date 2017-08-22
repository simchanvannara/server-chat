var env = process.env.NODE_ENV || 'development';

if (env === 'development') {
    process.env.PORT = 3030;
    process.env.MONGO_URI = 'mongodb://localhost:27017/TodoApp';
}else if (env === 'production') {
    process.env.PORT = 3030;
    process.env.MONGO_URI = 'mongodb://simon:123456@ds023463.mlab.com:23463/simon-todos';
}