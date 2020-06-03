var mongoose = require('mongoose');

var StaffSchema = new mongoose.Schema({

    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },

    role : {
        type: String,
        required: true
    },

    date: {
        type: Date,
        default: Date.now
    }
});

var Staff = mongoose.model('Staff', StaffSchema);

module.exports = Staff;