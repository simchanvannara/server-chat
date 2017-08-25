var mongoose = require('mongoose');

var Chat = mongoose.model('Chat', {
    text: {
        type: String,
        required: true,
    },
    user_id: {
        type: String,
        required: true,
    },
    completedAt: {
        type: Date,
        default: Date.now
    }
});

module.exports = {Chat}