//Managing connection with database
const mongoose = require('mongoose');
const connectDatabase = async function(){
    try{
        const DBconnection = await mongoose.connect(process.env.MONGOOSE_URL);
        // console.log(DBconnection.connection.host);
        console.log(`MongoDB connected at ${DBconnection.connection.host}`.green.underline);
    }
    catch(err){
        console.log(`MongoDB connection Failed ${err.message}`.red.underline);
        process.exit(1);
    }
}

module.exports = connectDatabase;