const express = require('express');
const colors = require('colors');
const dotenv = require('dotenv').config();
const PORT = process.env.PORT || 8000;
const connectDatabase = require('./config_DB/database');
const {errorHandler} = require('./middleware/errorMiddleware');

connectDatabase();

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: false}));

app.get('/', function(req,res){
    res.status(200).json({message:"Hello from JOB"});
});

//Route Begins Register, Login
app.use('/api/users', require('./routes/userRoutes'))
//error handling middleware
app.use(errorHandler);
app.listen(PORT, function(){
    console.log(`App started at Port ${PORT}`);
});