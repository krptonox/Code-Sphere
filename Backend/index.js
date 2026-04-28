// It is same as main.jsx in react , index.js start the server And it is used to connect DataBase

import dotenv from 'dotenv'
dotenv.config() 

import { createServer } from "node:http";

import app from './app.js'

import { initGroupSocket } from "./src/websocket/groupSocket.js";


const port = process.env.PORT  


import connectDB from "./src/DataBase/db.js";
connectDB()
.then(()=>{
    const server = createServer(app);
    initGroupSocket(server);

    server.listen(port, ()=>{ 
    console.log(`App listening on port ${port}`)
})
})
.catch((err) => {
    console.error("Failed to connect to the database. Server not started.", err);
}) 


console.log(`http://localhost:${port}/`)


//This is Server side code , it will run on Node.js environment and it will handle all the backend functionality of our application.