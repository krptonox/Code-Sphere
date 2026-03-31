class ApiResponse {
    constructor(statusCode, data, message = "Success") {
        this.statusCode = statusCode;
        this.data = data;
        this.message = message;
        this.success = statusCode < 400;
    }
}

export default ApiResponse;


//what is this file for?
//This file defines a class called ApiResponse that is used to create standardized response objects for API endpoints. It includes properties such as statusCode, data, message, and success to provide a consistent structure for API responses. This helps in improving the readability and maintainability of the code when handling API responses in the backend of an application.