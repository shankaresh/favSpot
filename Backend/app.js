const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

const placeRoutes = require('./routes/places-routes');
const userRoutes = require('./routes/users-routes');
const HttpError = require('./models/http-error');

const app = express();
const port = 5000;

// middleware
app.use(bodyParser.json());

// handle headers CORS issues
app.use(function(req, res, next) {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Authorization');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PATCH, DELETE');
    next();
});

// routes
app.use('/api/places', placeRoutes);
app.use('/api/users', userRoutes);

// 404 - no routes found middleware
app.use((req, res, next) => {
    const error = new HttpError('Could not find this route.', 404);
    throw error;
});

// on error handler routes
app.use((error, req, res, next) => {
    if (res.headerSent && res.statusCode) {
        return next(error);        
    }

    res.status(error.code || 500);

    res.json({
        message: error.message || 'An unknown error occurred!',
        error: process.env.NODE_ENV === 'development'? error : {}
    });
});


// connect to MongoDB and listen to port
mongoose
    .connect('mongodb+srv://dev:s51uIrMv0Qe92r2j@cluster0.bs96kki.mongodb.net/favSpotDB?retryWrites=true&w=majority')
    .then(() => {
        console.log('Connected to MongoDB');
        // server listen to port
        app.listen(port);
    })
    .catch(err => console.error(err));
