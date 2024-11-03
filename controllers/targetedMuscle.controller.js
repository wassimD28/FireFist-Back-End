const asyncHandler = require("express-async-handler");
const db = require("../models");
const TargetedMuscle = db.TargetedMuscle;

/**
 * @description returns all targetedMuscles
 * @method Get
 * @route /api/targetedMuscle
 * @access public
 */
const getAllTargetedMuscle = asyncHandler(async (req, res) => {
  const targetedMuscles = await TargetedMuscle.findAll();
  res.status(200).json(targetedMuscles);
});

/**
 * @description returns one targetedMuscle by id
 * @method Get
 * @route /api/targetedMuscle
 * @access public
 */
const getTargetedMuscleById = asyncHandler(async (req, res) => {
  const targetedMuscle = await TargetedMuscle.findOne({ where: { id: req.params.id } });
  // if targetedMuscle is not found
  if (!targetedMuscle) {
    return res.status(404).json({ message: "TargetedMuscle not found" });
  }

  res.status(200).json(targetedMuscle);
});

/**
 * @description creates a new targetedMuscle
 * @method POST
 * @route /api/targetedMuscle
 * @access protected
 */
const createTargetedMuscle = asyncHandler(async (req, res) => {
  const targetedMuscle = await TargetedMuscle.create(req.body);
  res.status(201).json(targetedMuscle);
});

/**
 * @description updates an existing targetedMuscle
 * @method PUT
 * @route /api/targetedMuscle/:id
 * @access protected
 */

const updateTargetedMuscle = asyncHandler(async (req, res) => {
  const targetedMuscle = await TargetedMuscle.findByPk(req.params.id);

  if (!targetedMuscle) {
    return res.status(404).json({ message: "TargetedMuscle not found" });
  }

  await targetedMuscle.update(req.body);

  res.status(200).json(targetedMuscle);
});

/**
 * @description deletes a targetedMuscle by id
 * @method DELETE
 * @route /api/targetedMuscle/:id
 * @access protected
 */
const deleteTargetedMuscle = asyncHandler(async (req, res) => {
  const targetedMuscle = await TargetedMuscle.findByPk(req.params.id);
  // check if targetedMuscle exists
  if (!targetedMuscle) {
    return res.status(404).json({ message: "TargetedMuscle not found" });
  }
  await targetedMuscle.destroy();

  res.status(204);
});

module.exports = {
  getAllTargetedMuscle,
  getTargetedMuscleById,
  createTargetedMuscle,
  updateTargetedMuscle,
  deleteTargetedMuscle,
};
