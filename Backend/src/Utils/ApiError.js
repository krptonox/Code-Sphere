class ApiError extends Error {
    constructor(
        statusCode,
        message = "Something went wrong",
        errors = [],
        stack = ""
    ) {
        super(message);
        this.statusCode = statusCode;
        this.errors = errors;
        this.data = null;
        this.message = message;
        this.success = false;

        if(stack) {
            this.stack = stack;
        }else{
            Error.captureStackTrace(this, this.constructor);
        }
    }
}

export default ApiError;


//what is this file for?
//This file defines a custom error class called ApiError that extends the built-in Error class in JavaScript. It is used to create standardized error objects for API responses, allowing developers to include additional information such as status codes, error messages, and stack traces when an error occurs in the backend of an application. This helps in better error handling and debugging.