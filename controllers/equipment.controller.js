// equipment.controller.js
const asyncHandler = require("express-async-handler");
const db = require("../models");
const { Op } = require('sequelize');
const Equipment = db.Equipment;
const User = db.User;

/**
 * @description returns all equipments
 * @method Get
 * @route /api/equipment
 * @access public
 */
const getAllStandardEquipment = asyncHandler(async (req, res) => {
  try {
    const equipments = await Equipment.findAll({
      include: [
        {
          model: User,
          where: {
            roles: {
              [Op.contains]: ["ROLE_ADMIN"], // Checks if the roles array contains "ADMIN_ROLE"
            },
          },
          attributes: [] // We don't need user details, so we exclude them
        },
      ],
    });
    res.status(200).json(equipments);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

const getAllCustomEquipment = asyncHandler(async (req, res) => {
  const user_id = req.params.user_id;
  const equipments = await Equipment.findAll({ where: { user_id } });
  res.status(200).json(equipments);
});

/**
 * @description returns one equipment by id
 * @method Get
 * @route /api/equipment
 * @access public
 */
const getEquipmentById = asyncHandler(async (req, res) => {
  const equipment = await Equipment.findOne({ where: { id: req.params.id } });
  // if equipment is not found
  if (!equipment) {
    return res.status(404).json({ message: "Equipment not found" });
  }

  res.status(200).json(equipment);
});

/**
 * @description creates a new equipment
 * @method POST
 * @route /api/equipment
 * @access public
 */
const createEquipment = asyncHandler(async (req, res) => {
  const { name, description, user_id } = req.body;
  const image = req.file
  ? `/uploads/images/equipment/${req.file.filename}`
  : null;

  if (!image) {
    return res.status(400).json({ message: "Image is required" });
  }

  const equipment = await Equipment.create({
    name: name.replace(/"/g, ""),
    description: description ? description.replace(/"/g, "") : null,
    image,
    user_id,
  });

  res.status(201).json(equipment);
});


/**
 * @description updates an existing equipment
 * @method PUT
 * @route /api/equipment/:id
 * @access protected
 */

const updateEquipment = asyncHandler(async (req, res) => {
  const equipment = await Equipment.findByPk(req.params.id);

  if (!equipment) {
    return res.status(404).json({ message: "Equipment not found" });
  }

  await equipment.update(req.body);

  res.status(200).json(equipment);
});

/**
 * @description deletes a equipment by id
 * @method DELETE
 * @route /api/equipment/:id
 * @access protected
 */
const deleteEquipment = asyncHandler(async (req, res) => {
  const equipment = await Equipment.findByPk(req.params.id);
  // check if equipment exists
  if (!equipment) {
    return res.status(404).json({ message: "Equipment not found" });
  }
  // check if the owner of the equipment
  if (
    equipment.user_id !== req.user.id ||
    req.user.roles.includes("ROLE_ADMIN")
  ) {
    return res
      .status(401)
      .json({ message: "Unauthorized to delete this equipment" });
  }
  await equipment.destroy();
  

  res.status(204);
});

module.exports = {
  getAllStandardEquipment,
  getAllCustomEquipment,
  getEquipmentById,
  createEquipment,
  updateEquipment,
  deleteEquipment,
};
