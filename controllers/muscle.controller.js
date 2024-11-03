const asyncHandler = require("express-async-handler");
const db = require("../models");
const Muscle = db.Muscle;

/**
 * @description returns all muscles
 * @method Get
 * @route /api/muscle
 * @access public
 */
const getAllMuscle = asyncHandler(async (req, res) => {
  const muscles = await Muscle.findAll();
  res.status(200).json(muscles);
});

/**
 * @description returns one muscle by id
 * @method Get
 * @route /api/muscle
 * @access public
 */
const getMuscleById = asyncHandler(async (req, res) => {
  const muscle = await Muscle.findOne({ where: { id: req.params.id } });
  // if muscle is not found
  if (!muscle) {
    return res.status(404).json({ message: "Muscle not found" });
  }

  res.status(200).json(muscle);
});

/**
 * @description creates a new muscle
 * @method POST
 * @route /api/muscle
 * @access protected
 */
const createMuscle = asyncHandler(async (req, res) => {
  const muscle = await Muscle.create(req.body);
  res.status(201).json(muscle);
});

/**
 * @description updates an existing muscle
 * @method PUT
 * @route /api/muscle/:id
 * @access protected
 */

const updateMuscle = asyncHandler(async (req, res) => {
  const muscle = await Muscle.findByPk(req.params.id);

  if (!muscle) {
    return res.status(404).json({ message: "Muscle not found" });
  }

  await muscle.update(req.body);

  res.status(200).json(muscle);
});

/**
 * @description deletes a muscle by id
 * @method DELETE
 * @route /api/muscle/:id
 * @access protected
 */
const deleteMuscle = asyncHandler(async (req, res) => {
  const muscle = await Muscle.findByPk(req.params.id);
  // check if muscle exists
  if (!muscle) {
    return res.status(404).json({ message: "Muscle not found" });
  }
  await muscle.destroy();

  res.status(204);
});

module.exports = {
  getAllMuscle,
  getMuscleById,
  createMuscle,
  updateMuscle,
  deleteMuscle,
};
