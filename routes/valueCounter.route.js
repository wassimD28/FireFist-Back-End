const express = require('express');
const valueCounterValidation = require('../validations/valueCounter.validation');
const checkAdminRole = require('../middleware/checkAdminRole');
const handleValidations = require('../middleware/handleValidations');
const { getAllValueCounter, getValueCounterById, createValueCounter, updateValueCounter, deleteValueCounter } = require('../controllers/valueCounter.controller');

const route = express();

// get all valueCounters
route.get('/', getAllValueCounter);

// Get a single valueCounter by id
route.get('/:id', getValueCounterById);

// Create a new valueCounter
route.post('/', checkAdminRole, valueCounterValidation, handleValidations, createValueCounter);

// Update a valueCounter
route.put('/:id', checkAdminRole, valueCounterValidation, handleValidations, updateValueCounter);

// Delete a valueCounter
route.delete('/:id', checkAdminRole, deleteValueCounter);

module.exports = route;