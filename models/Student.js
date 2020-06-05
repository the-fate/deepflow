var mongoose = require('mongoose');

var StudentSchema = new mongoose.Schema({

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
        default: 'student'
    },

    date: {
        type: Date,
        default: Date.now
    }
});

var Student = mongoose.model('Student', StudentSchema);

module.exports = Student;