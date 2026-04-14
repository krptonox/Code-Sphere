// It is Same as App.jsx , it handle Middleware setup and Route moounting

import express from 'express'
const app = express()  //app has all functionality of express

import cors from 'cors'
import cookieParser from 'cookie-parser'


app.use(cors({
    origin:process.env.CORS_ORIGIN, // Allow requests from the specified origin (e.g., http://localhost:5173)
    }
))

app.use(express.json())//express.json() is a built-in middleware function in Express.js that parses incoming JSON requests and puts the parsed data in req.body. This allows you to easily access the data sent in the request body when handling routes that expect JSON input.

app.use(express.urlencoded({extended:true}))//express.urlencoded() is a built-in middleware function in Express.js that parses incoming requests with URL-encoded payloads (such as form submissions) and puts the parsed data in req.body. The extended: true option allows for rich objects and arrays to be encoded into the URL-encoded format, which can be useful for handling complex form data.

app.use(express.static('public'))//express.static() is a built-in middleware function in Express.js that serves static files from a specified directory. In this case, it serves files from the 'public' directory. This means that any files placed in the 'public' folder can be accessed directly via the URL, allowing you to serve images, CSS files, JavaScript files, and other static assets to the client without needing to define specific routes for each file.

app.use(cookieParser())//cookieParser() is a middleware function that parses cookies attached to the client request object. It populates the req.cookies object with the parsed cookies, allowing you to easily access and manipulate cookie data in your route handlers. This is particularly useful for handling user sessions, authentication, and other features that rely on cookies for storing information on the client side.



app.get('/', (req, res) => {  //app.get() is used to handle GET requests to the specified route ('/'). It takes a callback function with two parameters: req (the request object) and res (the response object). In this case, when a GET request is made to the root route ('/'), the server responds with 'Code Sphere'.
    res.send('Code Sphere')
})

app.get('/api/jokes', (req, res) => {
    const jokes=[
        
        {
        id:1,
        title:'A joke',
        content:"Why don't scientists trust atoms? Because they make up everything!"
        },

        {
        id:2,
        title:'Another joke',
        content:"Why did the scarecrow win an award? Because he was outstanding in his field!"
        },

        {
        id:3,
        title:'Yet another joke',
        content:"Why don't skeletons fight each other? They don't have the guts!"
        },

        {
        id:4,
        title:'One more joke',
        content:"Why don't eggs tell jokes? They'd crack each other up!"
        }

    ]
    res.send(jokes)
})

 
//routes import 
import userRoutes from './src/Routes/user.routes.js'

//routes declaration
app.use('/api/users', userRoutes)


export default app