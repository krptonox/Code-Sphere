// It is same as main.jsx in react , index.js start the server And it is used to connect DataBase

import dotenv from 'dotenv'
dotenv.config() //dotenv is a zero-dependency module that loads environment variables from a .env file into process.env. This allows you to keep sensitive information, such as database credentials or API keys, separate from your codebase and easily manage them across different environments (development, testing, production).

// Resolved startup issue: backend now uses one module system (ESM) consistently.


import app from './app.js' //importing the app from app.js file which is responsible for handling all the routes and middleware of our application. It is the main entry point of our backend application.


const port = process.env.PORT  //port number on which our server will run


import connectDB from "./src/DataBase/db.js";
connectDB()
.then(()=>{
    app.listen(port, ()=>{ //app.listen() is used to start the server and listen for incoming requests on the specified port. It takes two parameters: the port number and a callback function that is executed once the server starts successfully.
    console.log(`App listening on port ${port}`)
})
})
.catch((err) => {
    console.error("Failed to connect to the database. Server not started.", err);
}) //connectDB is a function that connects to the MongoDB database using the mongoose library. It uses the MONGO_URI environment variable to establish the connection.



console.log(`http://localhost:${port}/`)


//This is Server side code , it will run on Node.js environment and it will handle all the backend functionality of our application.