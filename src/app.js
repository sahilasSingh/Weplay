const express = require('express');
const cors = require('cors');
const cookieParser = require('cookie-parser');
require('dotenv').config({path: './env/dev.env'});

const app = express();


app.use(cors({
    origin: process.env.CORS_ORIGIN,
    credentials: true
}));

app.use(express.json({limit: '16kb'}));
app.use(express.urlencoded({ extended: true, limit: '16kb' }));
app.use(express.static('public'));
app.use(cookieParser());


const userRouter = require('./routes/user_routes');


//routes declaration
app.use("/api/v1/users",userRouter);


module.exports = {app};