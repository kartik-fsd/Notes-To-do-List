const mongoose = require("mongoose");
mongoose.set("strictQuery", false);
const mongooseURI =
  "mongodb+srv://hippo:hippo@hippo.ngjfctp.mongodb.net/?retryWrites=true&w=majority&appName=hippo";

const connectMongo = () => {
  mongoose.connect(mongooseURI, () => {
    console.log("Connected successfully");
  });
};
module.exports = connectMongo;
