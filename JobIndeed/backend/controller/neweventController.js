const asyncHandler = require('express-async-handler');
const User = require('../models/userModel'); 
const Event = require('../models/eventModel');

//Get new events ,get/api/event
//@access : public
const get_newEvent = asyncHandler(async function(req, res){  
    const user = await User.findById(req.user.id);
    if(!user){
        res.status(401)
        throw new Error('User not found');
    }

    //Reading newEvents
    const events = await Event.find({
        user: req.user.id
    })
    
     res.status(200).json(events);
});

//Get new event ,get/api/event/:id
//@access : public
const get_oneEvent = asyncHandler(async function(req, res){  
    const user = await User.findById(req.user.id);
    if(!user){
        res.status(401)
        throw new Error('User not found');
    }

    //Reading newEvent
    const event = await Event.findById(req.params.id);
    if(!event){
        res.status(404)
        throw new Error('Event not found');
    }
    //check for the employer to access the event
    if(event.user.toString() !== req.user.id){
        res.status(401)
        throw new Error("User not Authorized")
    }
    res.status(200).json(event);
});


//Delete event , DELETE/api/event/:id
//@access : private
const delete_Event = asyncHandler(async function(req, res){  
    const user = await User.findById(req.user.id);
    if(!user){
        res.status(401)
        throw new Error('User not found');
    }

    //Reading Event
    const event = await Event.findById(req.params.id);
    if(!event){
        res.status(404)
        throw new Error('Event not found');
    }
    //check for the employer to access the event
    if(event.user.toString() !== req.user.id){
        res.status(401)
        throw new Error("User not Authorized")
    }
    await event.remove();

    res.status(200).json({success: true});
});

//@ desc: update event
//Update new event , UPDATE/api/event/:id
//@access : public

const update_Event = asyncHandler(async function(req, res){  
    const user = await User.findById(req.user.id);
    if(!user){
        res.status(401)
        throw new Error('User not found');
    }
    //Reading newEvent
    const event = await Event.findById(req.params.id);
    if(!event){
        res.status(404)
        throw new Error('Event not found');
    }
    //check for the employer to access the event
    if(event.user.toString() !== req.user.id){
        res.status(401)
        throw new Error("User not Authorized")
    }
    const updatedEvent = await Event.findByIdAndUpdate(req.params.id, req.body, {new: true})
    res.status(200).json(updatedEvent);
});


//Create new events ,post/api/tickets
//@access : public
const create_newEvent = asyncHandler(async function(req, res){ 
    const { designation, description } =  req.body;

    if(!designation || !description){
        res.status(400)
        throw new Error('Please add the Designation and Description');
    }
    //Get user who posts the event
    const user = await User.findById(req.user.id);
    if(!user){
        res.status(401)
        throw new Error('User not found');
    }

    //create event
    const new_event = await Event.create({
        designation,
        description, 
        user: req.user.id,
        status: 'new'
    });


    // res.status(200).json({message: "getEvents get triggered"});
    res.status(200).json(new_event);
});


module.exports = {
    get_newEvent,
    get_oneEvent,
    create_newEvent,
    delete_Event,
    update_Event,
}