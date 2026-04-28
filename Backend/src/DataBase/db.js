import mongoose from "mongoose";

import { DB_NAME } from "../../constant.js";


async function connectDB() {
    try{
        console.log("Connecting to MongoDB..." + DB_NAME);
        await mongoose.connect(`${process.env.MONGO_URI}/${DB_NAME}`);
        console.log("Connected to MongoDB successfully!");
    }catch(err){
        console.error("Error connecting to MongoDB:", err);
        throw err;
    }
}

export default connectDB;

