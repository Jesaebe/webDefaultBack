import mongoose from "mongoose";
import fileConnect from "../conexaoMongo.js";

async function connectDB() {
  let scriptConnection = "mongodb+srv://#user:#pass@cluster0.rojjyj1.mongodb.net/#banco_de_dados?retryWrites=true&w=majority&appName=Cluster0";
  scriptConnection = scriptConnection.replace("#user",fileConnect.user);
  scriptConnection = scriptConnection.replace("#pass",fileConnect.pass);
  scriptConnection = scriptConnection.replace("#banco_de_dados",fileConnect.db);
  console.log(scriptConnection);
  
  mongoose.connect(scriptConnection)
  
  return await mongoose.connection;
}

export default connectDB;