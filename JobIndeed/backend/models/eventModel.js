const mongoose = require('mongoose');
const neweventSchema = mongoose.Schema({
    //Every events will be added by an Employee referred as user
    user: {
        type: mongoose.Schema.Types.ObjectId,
        required: [true, "Please provide an Email"],
        unique: false
    },
    designation: {
        type: String,
        required: [true, "Please provide the designation"],
        enum: ['web developer','Designer','App developer']
    },
    description: {
        type: String,
        required: [true, "Please Enter the description of the Job Recruitment"]
    },
    // date: {
    //     type: Date,
    //     required: [true, "Please Enter the date of the Job Recruitment"]
    // },
    // experience: {
    //     type: Number,
    //     required: [true, "Please Enter the Minimum experience required"]
    // },
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