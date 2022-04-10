const asyncHandler = require('express-async-handler');
//controller for user management
//Register, login user , api/users ,api/users/login access -> public
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/userModel'); 

//For Googleoauth20
// const passport = require('passport');
// const GoogleStrategy = require('passport-google-oauth20').Strategy;
// const findOrCreate = require('mongoose-findorcreate');

//Register new user ,api/users
//@access : public
const registerUser = asyncHandler(async function(req, res){
    const {email, password} = req.body;
    //validation
    if(!email||!password)
    {
        res.status(400);
        throw new Error('Please Enter all the required Details');
    }
    //check existing user
    const userExist = await User.findOne({email: req.body.email})
    if(userExist){
        res.status(400)
        throw new Error('User Email already Exists');
    }
    //password encryption
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    //Create User
    const user = await User.create({
        email,
        password: hashedPassword
    });
    if(user)
    {
        res.status(201).json({
            _id: user._id,
            email: user.email,
            token: generateToken(user._id),
        });
    }else{
        res.status(400);
        throw new error('Invalid user Data');
    }

    res.send('Calling Register Route');
});

const googleRegister = asyncHandler(async function(req, res){
    const {email, password} = req.body;
    //validation
    if(!email||!password)
    {
        res.status(400);
        throw new Error('Please Enter all the required Details');
    }
    //check existing user
    const userExist = await User.findOne({email: req.body.email})
    if(userExist){
        res.status(400)
        throw new Error('User Email already Exists');
    }
    //password encryption
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    //Create User
    const user = await User.create({
        email,
        password: hashedPassword
    });
    if(user)
    {
        res.status(201).json({
            _id: user._id,
            email: user.email,
            token: generateToken(user._id),
        });
    }else{
        res.status(400);
        throw new error('Invalid user Data');
    }

    res.send('Calling Register Route');
});

const loginUser = asyncHandler(async function(req, res){
    const {email, password} = req.body;
    const user = await User.findOne({email});
   //Find and check user for login 
    if(user && (await bcrypt.compare(password, user.password)))
    {
        res.status(200).json({
            _id: user._id,
            email: user.email,
            token: generateToken(user._id),
        });
    }else{
        res.status(400);
        throw new Error('Invalid Login Credentials');
    }
} );

const loginGoogle = asyncHandler(async function(req, res){
    const {email} = req.body;
    const user = await User.findOne({email});
   //Find and check user for login 
    if(user)
    {
        res.status(200).json({
            _id: user._id,
            email: user.email,
            token: generateToken(user._id),
        });
    }
} );

//Get current user ,api/users/me
//@access : public
const getMe = asyncHandler(async function(req, res){
    const user = {
        id: req.user._id,
        email: req.user.email,
    }
    res.status(200).json(req.user);

})

const generateToken = function(id){
    return jwt.sign({id}, process.env.SECRET, {
        expiresIn: '10d',
    });
};

//GoogleoAuth20
// passport.use(new GoogleStrategy({
//     clientID: process.env.CLIENT_ID,
//     clientSecret: process.env.CLIENT_SECRET,
//     callbackURL: "http://localhost:5000/api/users/me",
//     userProfileURL: "https://www.googleapis.com/oauth2/v3/userinfo"
//   },
//   function(accessToken, refreshToken, profile, cb) {
//     User.findOrCreate({ googleId: profile.id }, function (err, user) {
//       return cb(err, user);
//     });
//   }
// ));


module.exports = {
    registerUser,
    loginUser,
    getMe,
    loginGoogle,
    googleRegister
}