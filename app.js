const express = require('express');
const app = express();
const port = 5000;

// middleware
app.use(express.json());

// routes

// server listen to port
app.listen(port);