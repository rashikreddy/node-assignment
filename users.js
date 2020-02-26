const express = require('express');
const fs = require('fs');
const app = express();
app.use(express.json());

users = [];

log = (req) => {
    fs.appendFileSync('log.txt', JSON.stringify({
        "method": req.method,
        "path": req.url,
        "date": new Date()
    }) + '\n');
    return
}


app.use('/post', (req, res, next) => {
    log(req);
    if (Object.keys(req.body).length === 0) {
        res.send('enter user details');
    } else {
        next();
    }
});

app.use('/update/:id', (req, res, next) => {
    log(req);

    if (Object.keys(req.body).length == 0) {
        res.send('enter user details');
    } else {
        next();
    }
});

app.use('/', (req, res, next) => {
    log(req);
    next();
});

app.post('/post', (req, res) => {
    try {
        object = {
            name: req.body.name,
            password: req.body.password,
            profession: req.body.profession,
            id: req.body.id
        }
        users.push(object);
        var objectJSON = JSON.stringify(object)
        fs.appendFileSync('output.json', objectJSON + '\n')
        res.send('new user created');
    } catch (error) {
        console.log(error);
    }
});

app.get('/get/:id', (req, res) => {
    try {
        var id = parseInt(req.params.id);
        for (var i = 0; i < users.length; i++) {
            if (id === parseInt(users[i].id)) {
                res.json(users[i]);
                fs.appendFileSync('output.json', JSON.stringify(users[i]) + '\n')
            }
        }
    } catch (error) {
        console.log(error);
    }
});

app.put('/update/:id', (req, res) => {
    var id = req.params.id;
    var profession = req.body.profession;
    var password = req.body.password;
    var name = req.body.name;
    if (password) {
        for (var i = 0; i < users.length; i++) {
            if (parseInt(id) === parseInt(users[i].id)) {
                users[i].password = password;
            }
        }
    }

    if (profession) {
        for (var i = 0; i < users.length; i++) {
            if (parseInt(id) === parseInt(users[i].id)) {
                users[i].profession = profession;
            }
        }
    }
    if (name) {
        for (var i = 0; i < users.length; i++) {
            if (parseInt(id) === parseInt(users[i].id)) {
                users[i].name = name;
            }
        }
    }
    res.send('updated')

});

app.delete('/delete/:id', async (req, res) => {
    var id = req.params.id1;
    for (var i = 0; i < users.length; i++) {
        if (parseInt(id) === parseInt(users[i].id)) {
            users.splice(i, 1);
            res.send('updated')
            console.log(users);
            console.log(users.length)
        }
    }
});

app.listen(3000, () => {
    console.log('Server running on port 3000');
})