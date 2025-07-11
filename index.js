const express = require('express');
require('dotenv').config();
const connectDb = require('./config/db');
const user = require('./routes/UserRouter');
const cors = require('cors');
const document = require('./routes/DocumentRouter');
const app = express();
const PORT = process.env.PORT;


app.use(express.json());
app.use(cors({
    origin: [
        "https://document-frontend-ebon.vercel.app",
        "https://document-frontend-b1881wmjg-nipun-sehrawat-projects.vercel.app",
        "https://document-frontend-6m93-b07wog21s-nipun-sehrawat-projects.vercel.app",
        "https://document-frontend-6m93.vercel.app"
    ],
    credentials: true,
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization', 'x-auth-token']
}));
app.use('/api/user' , user);
app.use('/api/doc',document)


app.get('/' , (req,res)=>{
    res.send('Welcome to server');
})

app.get('/api/health', (req, res) => {
    res.json({ status: 'ok' });
});


app.listen(PORT, async () => {
    try {
        await connectDb();
        console.log(`Server is listening on PORT ${PORT} and database is connected successfully`);
    } catch (error) {
        console.error('Failed to connect to database:', error.message);
        console.error('Please check your MONGO_URL environment variable and network connection');
        process.exit(1); // Exit the process if database connection fails
    }
});