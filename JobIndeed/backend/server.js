const express = require('express');
const colors = require('colors');
const dotenv = require('dotenv').config();
const PORT = process.env.PORT || 8000;
// const passport = require('passport');
// const GoogleStrategy = require('passport-google-oauth20').Strategy;
// const cookieSession = require('cookie-session');
// const cors = require('cors');
// const authRoute = require('./middleware/auth');
const connectDatabase = require('./config_DB/database');
const {errorHandler} = require('./middleware/errorMiddleware');





connectDatabase();

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: false}));

//for cookies for googleoAuth
// app.use(cookieSession(
//     {
//     name: "session",
//     keys: ["checkcookie"],
//     maxAge: 24*60*60*100
//     }
// ));
// app.use(passport.initialize()); 
// app.use(passport.session()); 
// app.use(cors({
//     origin: "http:localhost:3000",
//     methods: "GET,POST,PUT,DELETE",
//     credentials: true,
// })); // for api call visualization

// passport.use(new GoogleStrategy({
//     clientID: process.env.CLIENT_ID,
//     clientSecret: process.env.CLIENT_SECRET,
//     callbackURL: "http://www.example.com/auth/google/callback"
// },function(accessToken, refreshToken, profile, done){
//     done(null, profile)
// }
// ));

// passport.serializeUser((user, done)=>{
//     done(null, user);
// });

// passport.deserializeUser((user, done)=>{
//     done(null, user);
// });

// app.use("/auth", authRoute);

//google oauth

app.get('/', function(req,res){
    res.status(200).json({message:"Hello from JOB"});
});

//Route Begins Register, Login
app.use('/api/users', require('./routes/userRoutes'))

//Route Begins Register, newEvent
app.use('/api/event', require('./routes/neweventRoutes'))

//error handling middleware
app.use(errorHandler);
app.listen(PORT, function(){
    console.log(`App started at Port ${PORT}`);
});