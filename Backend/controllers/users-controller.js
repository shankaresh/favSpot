const { v4: uuidv4 } = require('uuid');
const HttpError = require('../models/http-error');
const { validationResult } = require('express-validator');

const DUMMY_USERS = [
    {
        id: 'u1',
        name: 'Tester',
        email: 'test@example.com',
        password: 'password'
    }
]

const getUsers = (req, res, next) => {
    res.json(DUMMY_USERS);
};

const signupUser = (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return next(new HttpError('Invalid input, please check your data.', 422));
    }

    const { name, email, password } = req.body;

    const existingUser = DUMMY_USERS.find(user => user.email === email);

    if (existingUser) {
        throw new HttpError('User already exists, please login instead.', 409);
    }

    const createdUser = {
        id: uuidv4(),
        name,
        email,
        password
    };

    DUMMY_USERS.push(createdUser);
    res.status(201).json(createdUser);
};

const loginUser = (req, res, next) => {
    const { email, password } = req.body;
    
    const identifiedUser = DUMMY_USERS.find(user => user.email === email);
    
    if (!identifiedUser || identifiedUser.password !== password) {
        throw new HttpError('Could not identify user, credentials seem to be wrong.', 401);
    }
    
    res.json({ userId: identifiedUser.id, token: 'valid-token', message: 'Successfully logged in!' });
};

module.exports = {
    getUsers,
    signupUser,
    loginUser
};