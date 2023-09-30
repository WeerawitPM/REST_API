const mongoose = require('mongoose');

const studentSchema = new mongoose.Schema({
    sid: Number,
    firstname: String,
    lastname: String,
    nickname: String,
    age: Number,
    email: String,
    phone: String,
    img: String,
});

const Student = mongoose.model('Student', studentSchema);
module.exports = Student;