const express = require('express');
const { check } = require('express-validator');

const { 
    getPlaceById, 
    getPlacesByUserId, 
    createPlace, 
    updatePlace, 
    deletePlace 
} = require('../controllers/places-controller');

const router = express.Router();

router.get('/:pid', getPlaceById);

router.get('/user/:uid', getPlacesByUserId);

router.post(
    '/', 
    [
        check('title').not().isEmpty().withMessage('Please enter your name'), 
        check('description').isLength({ min:5 }).withMessage('Title must not be empty').isLength({ max: 50 }).withMessage('Title must not exceed 50 characters'),
        check('address').not().isEmpty().withMessage('Address must not be empty'),
    ], 
    createPlace
);

router.patch(
    '/:pid', 
    [
        check('title').optional().isLength({ max: 50 }),
        check('description').optional().isLength({ min: 5, max: 50 }),
    ],
    updatePlace
);

router.delete('/:pid', deletePlace);

module.exports = router;