const { v4: uuidv4 } = require('uuid');
const HttpError = require('../models/http-error');
const { validationResult } = require('express-validator');

let DUMMY_PLACES = [
    {
        id: 'p1',
        title: 'Eiffel Tower',
        description: 'The iconic Eiffel Tower, located in Paris, France.',
        location: {
            lat: 48.8583,
            lng: 2.2945
        },
        address: 'The iconic Eiffel Tower, located in Paris, France.',
        createdBy: 'u1',
    }
];

const getPlaceById = (req, res, next) => {
    const placeId = req.params.pid;
    const place = DUMMY_PLACES.find(p => p.id === placeId);
    
    if (!place) {
        throw new HttpError('Could not find a place for the provided id.', 404);
    }
    
    res.json(place);
};


const getPlacesByUserId = (req, res, next) => {
    const userId = req.params.uid;
    const places = DUMMY_PLACES.filter(p => p.createdBy === userId);
    
    if (!places.length) {
        return next(
            new HttpError('Could not find a place for the provided user id.', 404)
        );
    }

    res.json(places);
};

const createPlace = async (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        console.error(errors);
        return next(new HttpError('Invalid input, please check your data.', 422));
    }

    const { title, description, address, creator } = req.body;

    let coordinates;
    try {
      coordinates = await getCoordsForAddress(address);
    } catch (error) {
      return next(error);
    }
  
    const createdPlace = {
        id: uuidv4(),
        title,
        description,
        location: coordinates,
        address,
        createdBy: creator, //req.user.id,
    };

    DUMMY_PLACES.push(createdPlace);
    res.status(201).json(createdPlace);
};

const updatePlace = (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        console.error(errors);
        return next(new HttpError('Invalid input, please check your data.', 422));
    }

    const { title, description } = req.body;
    const placeId = req.params.pid;

    let updatedPlace = { ...DUMMY_PLACES.find(p => p.id === placeId) };
    const updatedPlaceIndex = DUMMY_PLACES.findIndex(p => p.id === placeId);
    
    if (updatedPlaceIndex === -1) {
        throw new HttpError('Could not find a place for the provided id.', 404);
    }
    
    updatedPlace = {...updatedPlace, title, description };
    DUMMY_PLACES[updatedPlaceIndex] = updatedPlace;

    res.status(200).json(updatedPlace);
};

const deletePlace = (req, res, next) => {
    const placeId = req.params.pid;
    const deletedPlaceIndex = DUMMY_PLACES.findIndex(p => p.id === placeId);
    
    if (deletedPlaceIndex === -1) {
        throw new HttpError('Could not find a place for the provided id.', 404);
    }
    
    DUMMY_PLACES.splice(deletedPlaceIndex, 1);
    res.status(200).json({ message: 'Place deleted successfully.' });
};

module.exports = {
    getPlaceById,
    getPlacesByUserId,
    createPlace,
    updatePlace,
    deletePlace,
};