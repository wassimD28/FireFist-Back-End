const express = require('express');
const muscleValidation = require('../validations/muscle.validation');
const { getAllMuscle, getMuscleById, createMuscle, updateMuscle, deleteMuscle } = require('../controllers/muscle.controller');
const handleValidations = require('../middleware/handleValidations');
const checkAdminRole = require('../middleware/checkAdminRole');

const route = express();

// get all muscles
route.get('/', getAllMuscle);

// Get a single muscle by id
route.get('/:id', getMuscleById);

// Create a new muscle
route.post('/', checkAdminRole, muscleValidation, handleValidations, createMuscle);

// Update a muscle
route.put('/:id', checkAdminRole, muscleValidation, handleValidations, updateMuscle);

// Delete a muscle
route.delete('/:id', checkAdminRole, deleteMuscle);

module.exports = route;