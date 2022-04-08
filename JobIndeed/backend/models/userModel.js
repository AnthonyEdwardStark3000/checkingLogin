const mongoose = require('mongoose');
const userSchema = mongoose.Schema({
    email: {
        type:String,
        required: [true, "Please provide an Email"],
        unique: true
    },
    password: {
        type:String,
        required: [true, "Please provide an Email"]
    },
    isAdmin:{
        type:Boolean,
        required: true,
        default: false
    }
},
{
    timestamps: true,
});

module.exports = mongoose.model('User', userSchema); 