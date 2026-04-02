// const asyncHandler = (fn) => async (req, res, next) => {
//     try{
//       await fn(req,res,next)
//     } catch(err){
//         res.status(err.code || 500).json({message:"Internal Server Error"})
//     }
// }

import { request } from "express";

//this is try catch block for handling errors in asynchronous functions. It is a common pattern used in Express.js applications to catch and handle errors that may occur during the execution of asynchronous route handlers or middleware functions.


//We will do using Promise and .then() and .catch() instead of async await and try catch block because it is more cleaner and easier to read.

const asyncHandler = (requestHandler) => {
    return (req, res, next) => {
        Promise.resolve(requestHandler(req, res, next)).catch((err) => next(err))
    }
}

//Use of asyncHandler?
//The asyncHandler function is a higher-order function that takes an asynchronous request handler as an argument and returns a new function that wraps the original handler in a Promise. This allows you to handle errors that may occur during the execution of the asynchronous handler without needing to use try-catch blocks in each individual route handler. Instead, any errors that occur will be automatically caught and passed to the next middleware function (usually an error-handling middleware) for centralized error handling. This helps to keep your code cleaner and more maintainable by reducing repetitive error-handling code across your route handlers.

export default asyncHandler;
