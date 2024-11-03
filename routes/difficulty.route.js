const express = require('express');
const difficultyValidation = require('../validations/difficulty.validation');
const { getAllDifficulty, getDifficultyById, createDifficulty, updateDifficulty, deleteDifficulty } = require('../controllers/difficulty.controller');
const checkAdminRole = require('../middleware/checkAdminRole');
const handleValidations = require('../middleware/handleValidations');

const route = express();

// get all difficulties
route.get('/', getAllDifficulty);

// Get a single difficulty by id
route.get('/:id', getDifficultyById);

// Create a new difficulty
route.post('/', checkAdminRole, difficultyValidation, handleValidations, createDifficulty);

// Update a difficulty
route.put('/:id', checkAdminRole, difficultyValidation, handleValidations, updateDifficulty);

// Delete a difficulty
route.delete('/:id', checkAdminRole, deleteDifficulty);

module.exports = route;