const express = require('express');
const cors = require('cors');
const mongoose= require('mongoose');
const path = require('path')
require('dotenv').config();

const app = express();
const port = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());

// For heroku deployment
if (process.env.NODE_ENV === 'production'){
    app.use(express.static('client/build'))
}


const uri = process.env.MONGODB_URI;
mongoose.connect(uri, { useNewUrlParser: true, useCreateIndex: true, useUnifiedTopology: true });

const connection = mongoose.connection;
connection.once('open',()=>{
    console.log("MongoDB database is connected")
})

const exerciseRouter = require('./routes/exercise');
const userRouter = require('./routes/user');

app.use('/exercise', exerciseRouter);
app.use('/user', userRouter);

app.listen(port, ()=>{
    console.log(`Server is up and running in ${port}`);
})