const express = require('express');
require('dotenv').config();
const app = express();
app.use(express.json());


var router = require('./routes/students.js');
app.use(router);

app.listen(process.env.PORT,()=>{
    console.log('server started');
})