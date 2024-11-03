const asyncHandler = require("express-async-handler");
const db = require("../models");
const Category = db.Category;

/**
 * @description returns all categories
 * @method Get
 * @route /api/category
 * @access public
 */
const getAllCategory = asyncHandler(async (req, res) => {
  const categories = await Category.findAll();
  res.status(200).json(categories);
});

/**
 * @description returns one category by id
 * @method Get
 * @route /api/category
 * @access public
 */
const getCategoryById = asyncHandler(async (req, res) => {
  const category = await Category.findOne({ where: { id: req.params.id } });
  // if category is not found
  if (!category) {
    return res.status(404).json({ message: "Category not found" });
  }

  res.status(200).json(category);
});

/**
 * @description creates a new category
 * @method POST
 * @route /api/category
 * @access protected
 */
const createCategory = asyncHandler(async (req, res) => {
  const category = await Category.create(req.body);
  res.status(201).json(category);
});

/**
 * @description updates an existing category
 * @method PUT
 * @route /api/category/:id
 * @access protected
 */

const updateCategory = asyncHandler(async (req, res) => {
  const category = await Category.findByPk(req.params.id);

  if (!category) {
    return res.status(404).json({ message: "Category not found" });
  }

  await category.update(req.body);

  res.status(200).json(category);
});

/**
 * @description deletes a category by id
 * @method DELETE
 * @route /api/category/:id
 * @access protected
 */
const deleteCategory = asyncHandler(async (req, res) => {
  const category = await Category.findByPk(req.params.id);

  if (!category) {
    return res.status(404).json({ message: "Category not found" });
  }

  await category.destroy();

  res.status(204).json({ message: "Category deleted successfully" });
});



module.exports = {
  getAllCategory,
  getCategoryById,
  createCategory,
  updateCategory,
  deleteCategory,
};
