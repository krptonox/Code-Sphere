import mongoose from "mongoose";

import { DB_NAME } from "../../constant.js";


async function connectDB() {
    try{
        const connection = process.env.MONGO_URI;
        console.log("Connecting to MongoDB..." + DB_NAME);
        await mongoose.connect(`${process.env.MONGO_URI}/${DB_NAME}`);
        console.log("Connected to MongoDB successfully!");
    }catch(err){
        console.error("Error connecting to MongoDB:", err);
    }
}

export default connectDB;


//why async function used?
//The async function is used to handle asynchronous operations, such as connecting to a database. In this case, the connectDB function is declared as async because it uses the await keyword to wait for the mongoose.connect() method to complete before proceeding. This allows the function to handle the asynchronous nature of database connections and ensures that the connection is established before any further code is executed.


//what is await mongoose.connect(`${process.env.MONGO_URI}/${DB_NAME}`);
//The await keyword is used to wait for the promise returned by mongoose.connect() to resolve. The mongoose.connect() method is used to establish a connection to a MongoDB database. It takes a connection string as an argument, which in this case is constructed using the MONGO_URI environment variable and the DB_NAME constant. By using await, the function will pause execution until the connection is successfully established or an error occurs, allowing for proper handling of the asynchronous operation.


//which js file is responsible for connecting to the database?
//The index.js file in the Backend directory is responsible for connecting to the database. It imports the connectDB function from the db.js file in the src/DataBase directory and calls it to establish a connection to the MongoDB database when the server starts.


//what is the role of server in connecting to the database?
//The server, in this case an Express.js application, is responsible for handling incoming requests and managing the application's backend functionality. When the server starts, it calls the connectDB function to establish a connection to the MongoDB database. This allows the server to interact with the database, perform CRUD operations, and serve data to the frontend as needed. The server acts as an intermediary between the frontend and the database, facilitating communication and data exchange between them.


//what is server here in this context?
//In this context, the server refers to the Express.js application that is created in the index.js file. It is responsible for handling HTTP requests, managing routes, and providing backend functionality for the application. The server listens for incoming requests on a specified port and responds accordingly, allowing the frontend to interact with the backend and access data from the database.


//Is the server at localhost:8000?
//Yes, the server is running at localhost:8000 as specified in the .env file with the PORT environment variable. When you start the server using the command npm start, it will listen for incoming requests on that port, allowing you to access the backend functionality of your application through http://localhost:8000/.