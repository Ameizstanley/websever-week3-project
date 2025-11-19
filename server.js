require('dotenv').config();
const express = require('express');
const mongodb = require('./model/database');
// const cors = require('cors');

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(express.json());


app.use((req, res, next) => {
    res.setHeader('Access-control-Allow-origin', '*');
    res.setHeader(
        'Access-Control-Allow-Headers',
        "Origin, X-Requested-with, Content-type, Accept,Z-key"
    );
    res.setHeader('Access-Control-Allow-Methods', "GET, POST, PUT, DELETE, OPTIONS");
    next();
});



app.use('/', require('./router'));


// Initialize database and start server
mongodb.initDb((err) => {
    if (err) {
        console.error('Failed to initialize database:', err);
        process.exit(1);
    }
    
    app.listen(PORT, () => {
        console.log(`✅ Server is running on http://localhost:${PORT}`);
    });
});



