import mongoose from "mongoose";

async function connectDB() {
  console.log(process.env.DB_CONNECTION_STRING);
  
  mongoose.connect(process.env.DB_CONNECTION_STRING);  
  return await mongoose.connection;
}

export default connectDB;