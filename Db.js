const mongoose = require('mongoose');
const mongoURI = 'mongodb://127.0.0.1:27017/practical?directConnection=true';

async function connectToMongo () {
    try{
        await mongoose.connect(mongoURI);
        console.log("MongoDB connected successfully")
    }catch(error){
        console.error("There is some error")
    }

}


module.exports = connectToMongo;