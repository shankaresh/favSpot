const express = require('express');

const bodyParser = require('body-parser');

const placeRoutes = require('./routes/places-routes');

const HttpError = require('./models/http-error');

const app = express();

const port = 5000;

// // middleware
app.use(bodyParser.json());

// routes
app.use('/api/places', placeRoutes);

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

// server listen to port
app.listen(port);