const express = require('express');
const targetedMuscleValidation = require('../validations/targetedMuscle.validation');

const handleValidations = require('../middleware/handleValidations');
const { createTargetedMuscle } = require('../controllers/targetedMuscle.controller');
const { updateTargetedMuscle } = require('../controllers/targetedMuscle.controller');
const { deleteTargetedMuscle } = require('../controllers/targetedMuscle.controller');
const { getTargetedMuscleById } = require('../controllers/targetedMuscle.controller');
const { getAllTargetedMuscle } = require('../controllers/targetedMuscle.controller');

const route = express();

// get all targetedMuscles
route.get('/', getAllTargetedMuscle);

// Get a single targetedMuscle by id
route.get('/:id', getTargetedMuscleById);

// Create a new targetedMuscle
route.post('/', targetedMuscleValidation, handleValidations, createTargetedMuscle);

// Update a targetedMuscle
route.put('/:id', targetedMuscleValidation, handleValidations, updateTargetedMuscle);

// Delete a targetedMuscle
route.delete('/:id', deleteTargetedMuscle);

module.exports = route;