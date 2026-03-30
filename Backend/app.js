// It is Same as App.jsx , it handle Middleware setup and Route moounting

import express from 'express'
const app = express()  //app has all functionality of express


app.get('/', (req, res) => {  //app.get() is used to handle GET requests to the specified route ('/'). It takes a callback function with two parameters: req (the request object) and res (the response object). In this case, when a GET request is made to the root route ('/'), the server responds with 'Code Arena'.
    res.send('Code Arena')
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



export default app