import mongoose from "mongoose";
import fileConnect from "../conexaoMongo.js";

async function connectDB() {
  const connect = fileConnect.replace("#banco_de_dados","JesaWebBooks");
  mongoose.connect(connect)
  
  return await mongoose.connection;
}

export default connectDB;