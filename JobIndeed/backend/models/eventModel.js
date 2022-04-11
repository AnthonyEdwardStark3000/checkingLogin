const mongoose = require('mongoose');
const neweventSchema = mongoose.Schema({
    //Every events will be added by an Employee referred as user
    user: {
        type: mongoose.Schema.Types.ObjectId,
        required: [true, "Please provide an Email"],
        unique: true
    },
    designation: {
        type: String,
        required: [true, "Please provide an Email"],
        enum: ['web developer','designer']
    },
    description: {
        type: String,
        required: [true, "Please Enter the description of the Job Recruitment"]
    },
    status:{
        type: String,
        required: true,
        enum: ['new', 'open', 'closed'],
        default: 'new'
    }
},
{
    timestamps: true,
});

module.exports = mongoose.model('Newevent', neweventSchema); 