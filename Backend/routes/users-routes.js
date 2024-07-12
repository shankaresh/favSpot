const express = require('express');

const { 
    getUsers, 
    signupUser, 
    loginUser
} = require('../controllers/users-controller');
const { check } = require('express-validator');

const router = express.Router();

router.get('/', getUsers);

router.post(
    '/signup', 
    [
        check('name').not().isEmpty().withMessage('Name is required'),
        check('email').normalizeEmail().isEmail().withMessage('Please enter a valid email'),
        check('password').isLength({ min: 6 }).withMessage('Password must be at least 6 characters long')
    ],
    signupUser
);

router.post(
    '/login', 
    loginUser
);

module.exports = router;