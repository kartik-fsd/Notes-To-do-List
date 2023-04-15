const mongoose = require('mongoose');
mongoose.set('strictQuery', false);
const mongooseURI = 'mongodb://localhost:27017/notes?directConnection=true';

const connectMongo = ()=>{
    mongoose.connect(mongooseURI ,()=>{
        console.log("Connected successfully");
    });
}
module.exports = connectMongo;