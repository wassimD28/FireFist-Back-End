const asyncHandler = require("express-async-handler");
const db = require("../models");
const ensureArray = require("../utils/ensureArray");
const Exercise = db.Exercise;
const TargetedMuscle = db.TargetedMuscle;
const Muscle = db.Muscle;
const Category = db.Category;
const Difficulty = db.Difficulty;

/**
 * @description returns all exercises
 * @method Get
 * @route /api/exercise
 * @access public
 */
const getAllExercises = asyncHandler(async (req, res) => {
  const user_id = req.params.id;

  const exercises = await Exercise.findAll({
    where: { user_id },
    include: [
      {
        model: TargetedMuscle,
        attributes: ["id", "pressureLevel"],
        include: [
          {
            model: Muscle,
            attributes: ["name", "image"],
          },
        ],
      },
      {
        model: Category,
        attributes: ["image"],
      },
      {
        model: Difficulty,
        attributes: ["name"],
      },
    ],
  });

  const simplifiedExercises = exercises.map((exercise) => ({
    id: exercise.id,
    name: exercise.name,
    image: exercise.image,
    category: exercise.Category.image,
    difficulty: exercise.Difficulty.name,
    targetedMuscles: exercise.TargetedMuscles
      ? exercise.TargetedMuscles.map((targetedMuscle) => ({
          name: targetedMuscle.Muscle.name,
          image: targetedMuscle.Muscle.image,
          pressureLevel: targetedMuscle.pressureLevel,
        }))
      : [],
    createdAt: exercise.createdAt,
    updatedAt: exercise.updatedAt,
  }));

  res.status(200).json(simplifiedExercises);
});

/**
 * @description returns one exercise by id
 * @method Get
 * @route /api/exercise
 * @access public
 */
const getExerciseById = asyncHandler(async (req, res) => {
  const exercise = await Exercise.findOne({ where: { id: req.params.id } });
  // if exercise is not found
  if (!exercise) {
    return res.status(404).json({ message: "Exercise not found" });
  }

  res.status(200).json(exercise);
});

/**
 * @description creates a new exercise
 * @method POST
 * @route /api/exercise
 * @access protected
 */
const createExercise = asyncHandler(async (req, res) => {
  // Create relative path for storing in database
  const imagePath = req.file
    ? `/uploads/images/exercise/${req.file.filename}`
    : null;

  const exerciseData = {
    ...req.body,
    image: imagePath,
  };

  const exercise = await Exercise.create(exerciseData);

  // Ensure equipment_id is an array
  const equipments = ensureArray(req.body.equipment_id);

  // Handle targeted muscles
  let targetedMuscles = ensureArray(req.body.targetedMuscle).map((tm) => {
    return typeof tm === "string" ? JSON.parse(tm) : tm;
  });

  const result = {
    id: exercise.id,
    name: exercise.name,
    description: exercise.description,
    user_id: exercise.user_id,
    privacy: exercise.privacy,
    image: exercise.image,
    difficulty_id: exercise.difficulty_id,
    category_id: exercise.category_id,
    valueCounter_id: exercise.valueCounter_id,
    equipment_id: [],
    targetedMuscle: [],
  };

  // Adding equipment to exercise
  for (const equipment of equipments) {
    await exercise.addEquipment(equipment);
    result.equipment_id.push(equipment);
  }

  // Create the related targeted muscles
  for (const targetedMuscle of targetedMuscles) {
    const savedTargetedMuscle = await TargetedMuscle.create({
      user_id: exercise.user_id,
      exercise_id: exercise.id,
      muscle_id: targetedMuscle.muscle_id,
      pressureLevel: targetedMuscle.pressureLevel,
    });
    result.targetedMuscle.push(savedTargetedMuscle);
  }

  res.status(201).json(result);
});

/**
 * @description updates an existing exercise
 * @method PUT
 * @route /api/exercise/:id
 * @access protected
 */

const updateExercise = asyncHandler(async (req, res) => {
  const exercise = await Exercise.findByPk(req.params.id);

  if (!exercise) {
    return res.status(404).json({ message: "Exercise not found" });
  }

  await exercise.update(req.body);

  res.status(200).json(exercise);
});

/**
 * @description deletes a exercise by id
 * @method DELETE
 * @route /api/exercise/:id
 * @access protected
 */
const deleteExercise = asyncHandler(async (req, res) => {
  // check if exercise exists
  const exercise = await Exercise.findByPk(req.params.id);
  if (!exercise) {
    return res.status(404).json({ message: "Exercise not found" });
  }
  // check if the owner of the exercise
  if (exercise.user_id !== req.user.id) {
    return res
      .status(401)
      .json({ message: "Unauthorized to delete this exercise" });
  }

  await exercise.destroy();

  res.status(204).json({ message: "Exercise deleted successfully" });
});

module.exports = {
  getAllExercises,
  getExerciseById,
  createExercise,
  updateExercise,
  deleteExercise,
};
