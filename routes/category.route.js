const express = require('express');
const categoryValidation = require('../validations/category.validation');
const { getAllCategory, getCategoryById, createCategory, updateCategory, deleteCategory } = require('../controllers/category.controller');
const checkAdminRole = require('../middleware/checkAdminRole');
const handleValidations = require('../middleware/handleValidations');

const route = express();

// get all categories
route.get('/', getAllCategory);

// Get a single category by id
route.get('/:id', getCategoryById);

// Create a new category
route.post('/', checkAdminRole, categoryValidation, handleValidations, createCategory);

// Update a category
route.put('/:id', checkAdminRole, categoryValidation, handleValidations, updateCategory);

// Delete a category
route.delete('/:id', checkAdminRole, deleteCategory);

module.exports = route;