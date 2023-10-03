const express = require('express')
const cors = require('cors'); // ทำให้สามารถเรียกใช้งาน api ได้ทุก ๆ domain
const mongoose = require('mongoose');
const Student = require('./student_schema.js');

const app = express()
const port = 3000
app.use(cors());
app.use(express.json());

// Connect to MongoDB
const db = "mongodb+srv://admin:1234@cluster0.yiyc05o.mongodb.net/student_data?retryWrites=true&w=majority"
mongoose.connect(db, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => console.log('MongoDB Connected...'))
    .catch(err => console.log(err));

// Create a new student
app.post('/student/add', (req, res) => {
    let student = new Student(req.body);
    //สร้างวันที่ โดยแสดงแบบ วัน/เดือน/ปี เวลา เช่น 1/1/2021 12:00:00
    student.createdAt = new Date().toLocaleString('th-TH', { timeZone: 'Asia/Bangkok' });

    student.save()
        .then((result) => {
            res.send(result);
        })
        .catch((err) => {
            console.log(err);
        });
});

// Get all students
app.get('/student/get', (req, res) => {
    Student.find()
        .then((result) => {
            res.send(result);
        })
        .catch((err) => {
            console.log(err);
        });
});

// Get a student by sid
app.get('/student/find', (req, res) => {
    const sid = req.query.sid;
    Student.find({ sid: sid })
        .then((result) => {
            res.send(result);
        })
        .catch((err) => {
            console.log(err);
        });
});

// Update a student by sid
app.patch('/student/update', (req, res) => {
    const sid = req.query.sid;
    Student.findOneAndUpdate({ sid: sid }, { $set: req.body })
        .then((result) => {
            res.send(result);
        })
        .catch((err) => {
            console.log(err);
        });
});

// Delete a student by sid
app.delete('/student/delete', (req, res) => {
    const sid = req.query.sid;
    Student.findOneAndDelete({ sid: sid })
        .then((result) => {
            res.send(result);
        })
        .catch((err) => {
            console.log(err);
        });
});

app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`)
})

module.exports = app