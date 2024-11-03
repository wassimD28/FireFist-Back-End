const { body } = require("express-validator");
const { Exercise, User, Muscle, TargetedMuscle } = require("../models");

// targetedMuscle validations
const targetedMuscleValidation = [
  body("exercise_id")
    .isNumeric()
    .withMessage("exercise_id must be a number")
    .bail()
    // to check that the exercise exists
    .custom(async (value) => {
      const existingExercise = await Exercise.findOne({
        where: { id: value },
      });
      if (!existingExercise) {
        throw new Error("there is no such exercise with id = " + value);
      }
    }),
  body("user_id")
    .isNumeric()
    .withMessage("user_id must be a number")
    .bail()
    // to check that the user exists
    .custom(async (value) => {
      const existingUser = await User.findOne({
        where: { id: value },
      });
      if (!existingUser) {
        throw new Error("there is no such user with id = " + value);
      }
    }),
  body("muscle_id")
    .isNumeric()
    .withMessage("muscle_id must be a number")
    .bail()
    // to check that the muscle exists
    .custom(async (value) => {
      const existingMuscle = await Muscle.findOne({
        where: { id: value },
      });
      if (!existingMuscle) {
        throw new Error("there is no such muscle with id = " + value);
      }
    })
    // making sure that the muscle not already related with the current exercise
    .custom(async (value, { req }) => {
      const { exercise_id } = req.body; // get exercise_id from the request body
      const existingRelation = await TargetedMuscle.findOne({
        where: {
          exercise_id: exercise_id,
          muscle_id: value,
        },
      });
      if (existingRelation) {
        throw new Error(
          "The muscle with id = " +
            value +
            ", is already related to this exercise"
        );
      }
    }),
  body("pressureLevel")
    .isString()
    .withMessage("pressureLevel must be a string")
    .isIn(["low", "medium", "high", "very hight"])
    .withMessage(
      "pressureLevel must be one of the following: low, medium, high, very hight"
    )
    .bail(),
];

module.exports = targetedMuscleValidation;
