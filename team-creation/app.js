const express = require('express');
require('dotenv').config();
const app = express();
app.use(express.json());

const router = require('./routes/team.js');
app.use(router);

app.listen(process.env.PORT,()=>{
    console.log('server started');
});


