const asyncHandler = require("express-async-handler");
const db = require("../models");
const ValueCounter = db.ValueCounter;

/**
 * @description returns all valueCounters
 * @method Get
 * @route /api/valueCounter
 * @access public
 */
const getAllValueCounter = asyncHandler(async (req, res) => {
  const valueCounters = await ValueCounter.findAll();
  res.status(200).json(valueCounters);
});

/**
 * @description returns one valueCounter by id
 * @method Get
 * @route /api/valueCounter
 * @access public
 */
const getValueCounterById = asyncHandler(async (req, res) => {
  const valueCounter = await ValueCounter.findOne({ where: { id: req.params.id } });
  // if valueCounter is not found
  if (!valueCounter) {
    return res.status(404).json({ message: "ValueCounter not found" });
  }

  res.status(200).json(valueCounter);
});

/**
 * @description creates a new valueCounter
 * @method POST
 * @route /api/valueCounter
 * @access protected
 */
const createValueCounter = asyncHandler(async (req, res) => {
  const valueCounter = await ValueCounter.create(req.body);
  res.status(201).json(valueCounter);
});

/**
 * @description updates an existing valueCounter
 * @method PUT
 * @route /api/valueCounter/:id
 * @access protected
 */

const updateValueCounter = asyncHandler(async (req, res) => {
  const valueCounter = await ValueCounter.findByPk(req.params.id);

  if (!valueCounter) {
    return res.status(404).json({ message: "ValueCounter not found" });
  }

  await valueCounter.update(req.body);

  res.status(200).json(valueCounter);
});

/**
 * @description deletes a valueCounter by id
 * @method DELETE
 * @route /api/valueCounter/:id
 * @access protected
 */
const deleteValueCounter = asyncHandler(async (req, res) => {
  const valueCounter = await ValueCounter.findByPk(req.params.id);

  if (!valueCounter) {
    return res.status(404).json({ message: "ValueCounter not found" });
  }

  await valueCounter.destroy();

  res.status(204).json({ message: "ValueCounter deleted successfully" });
});



module.exports = {
  getAllValueCounter,
  getValueCounterById,
  createValueCounter,
  updateValueCounter,
  deleteValueCounter,
};
