const express = require('express');
var service = require('../services/students.js')
const router = express.Router();

router.use('/api/enterdetails', (req, res, next) => {
    if (typeof (req.body.id) == "number" && typeof (req.body.name) == "string" && typeof (req.body.email) == "string" && typeof (req.body.department) == "string") {
        next();
    } else {
        res.send('invalid input');
    }
});

router.post('/api/enterdetails', async (req, res) => {
    try {
        var id = req.body.id;
        var name = req.body.name;
        var email = req.body.email;
        var department = req.body.department;
        userdetails = {
            id: id,
            name: name,
            email: email,
            department: department
        }
        const result = await service.createUser(userdetails);
        if (result) {
            res.send('new user inserted')
        } else {
            throw new Error("data not inserted");
        }
    } catch (err) {
        console.log('---exception---', err);
        res.send(err.message);
    }
});

router.use('/api/users/:id', (req, res, next) => {
    if (isNaN(req.params.id) === false) {
        next();
    } else {
        res.send('invalid input');
    }
});

router.get('/api/users/:id', async (req, res) => {
    try {
        var id = req.params.id;
        const result = await service.getUser(id);
        console.log(result[0])
        if (result[0] == undefined) {
            throw new Error('data not retrieved');
        }
        res.send(result);
    } catch (err) {
        console.log("---exception---", err);
        res.send(err.message);
    }

});

router.use('/update/:id', (req, res, next) => {
    if (isNaN(req.params.id) === false) {
        next();
    } else {
        res.send('invalid input');
    }
});

router.put('/update/:id', async (req, res) => {
    try {
        var id = req.params.id;
        const data = req.body;
        const result = await service.updateUser(id, data);
        if (result) {
            res.send('student details updated');
        } else {
            throw new Error('data not updated');
        }
    } catch (err) {
        console.log('---exception---', err);
        res.send(err.message);
    }
})

router.use('/api/delete/:id', (req, res, next) => {
    if (isNaN(req.params.id) === false) {
        next();
    } else {
        res.send('invalid input');
    }
});


router.delete('/api/delete/:id', async (req, res) => {
    try {
        var id = req.params.id;
        var result = await service.deleteUser(id);
        if (result.deletedCount == 1) {
            res.send('student record deleted');
        } else {
            throw new Error('data not deleted');
        }
    } catch (err) {
        console.log('---exception---', err);
        res.send(err.message);
    }
});

module.exports = router;