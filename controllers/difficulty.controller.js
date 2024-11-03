const asyncHandler = require("express-async-handler");
const db = require("../models");
const Difficulty = db.Difficulty;

/**
 * @description returns all difficulties
 * @method Get
 * @route /api/difficulty
 * @access public
 */
const getAllDifficulty = asyncHandler(async (req, res) => {
  const difficulties = await Difficulty.findAll();
  res.status(200).json(difficulties);
});

/**
 * @description returns one difficulty by id
 * @method Get
 * @route /api/difficulty
 * @access public
 */
const getDifficultyById = asyncHandler(async (req, res) => {
  const difficulty = await Difficulty.findOne({ where: { id: req.params.id } });
  // if difficulty is not found
  if (!difficulty) {
    return res.status(404).json({ message: "Difficulty not found" });
  }

  res.status(200).json(difficulty);
});

/**
 * @description creates a new difficulty
 * @method POST
 * @route /api/difficulty
 * @access protected
 */
const createDifficulty = asyncHandler(async (req, res) => {
  const difficulty = await Difficulty.create(req.body);
  res.status(201).json(difficulty);
});

/**
 * @description updates an existing difficulty
 * @method PUT
 * @route /api/difficulty/:id
 * @access protected
 */

const updateDifficulty = asyncHandler(async (req, res) => {
  const difficulty = await Difficulty.findByPk(req.params.id);

  if (!difficulty) {
    return res.status(404).json({ message: "Difficulty not found" });
  }

  await difficulty.update(req.body);

  res.status(200).json(difficulty);
});

/**
 * @description deletes a difficulty by id
 * @method DELETE
 * @route /api/difficulty/:id
 * @access protected
 */
const deleteDifficulty = asyncHandler(async (req, res) => {
  const difficulty = await Difficulty.findByPk(req.params.id);

  if (!difficulty) {
    return res.status(404).json({ message: "Difficulty not found" });
  }

  await difficulty.destroy();

  res.status(204).json({ message: "Difficulty deleted successfully" });
});



module.exports = {
  getAllDifficulty,
  getDifficultyById,
  createDifficulty,
  updateDifficulty,
  deleteDifficulty,
};
