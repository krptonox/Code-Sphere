// It is Same as App.jsx , it handle Middleware setup and Route mounting

import express from 'express'
const app = express()  //app has all functionality of express

import cors from 'cors'
import cookieParser from 'cookie-parser'
import userRoutes from './src/Routes/user.routes.js'
import groupRoutes from './src/Routes/group.routes.js'



app.use(cors({
    origin: process.env.CORS_ORIGIN || 'http://localhost:5173',
    credentials: true,
}))

app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(cookieParser())


app.get('/', (req, res) => {
    res.send('Code Sphere')
})

 
//routes declaration
app.use('/api/users', userRoutes)
app.use('/api/groups', groupRoutes)

app.use((err, req, res, next) => {
    let statusCode = err?.statusCode || 500;
    let message = err?.message || 'Internal Server Error';

    if (err?.name === 'ValidationError') {
        statusCode = 400;
        message = err?.message || 'Validation failed';
    }

    return res.status(statusCode).json({
        statusCode,
        data: err?.data || null,
        message,
        success: false,
        errors: err?.errors || [],
    });
})


export default app