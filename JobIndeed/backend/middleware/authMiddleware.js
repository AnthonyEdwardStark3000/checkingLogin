// for protecting the /me route.
//Token authorization

const jwt = require('jsonwebtoken');
const asyncHandler = require('express-async-handler');
const User = require('../models/userModel');

const protect = asyncHandler(async function(req, res, next){
    let token;
    if(req.headers.authorization && req.headers.authorization.startsWith('Bearer')){
        try{
            console.log("token auth");
            //Token from header
            token = req.headers.authorization.split(' ')[1]; //splitting and separating token from Bearer word    
            //verification
            const decoded = jwt.verify(token, process.env.SECRET);
            //Get user from token
            req.user = await User.findById(decoded.id).select('-password');
            next();
        }catch(err){
            console.log(err);
            res.status(401);
            throw new Error('Not Authorized')
        }
    }
    //check for token
    if(!token){
        res.status(401);
        throw new Error('Not Authorized');
    }
});

module.exports = { protect };