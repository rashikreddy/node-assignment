const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost:27017/students', {
        useNewUrlParser: true,
        useUnifiedTopology: true
    });
var schema = mongoose.Schema;

var userData = new schema({
    id: Number,
    name: String,
    email: String,
    department: String
});

const studentData = mongoose.model("details", userData);

module.exports.studentData = studentData;