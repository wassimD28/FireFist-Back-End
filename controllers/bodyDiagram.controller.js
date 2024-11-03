// Import necessary modules and models
const asyncHandler = require("express-async-handler");
const db = require("../models");
const BodyDiagram = db.BodyDiagram;
const Path = db.Path;
const Muscle = db.Muscle;

/**
 * @description returns all bodyDiagrams
 * @method Get
 * @route /api/bodyDiagram
 * @access public
 */
const getAllBodyDiagrams = asyncHandler(async (req, res) => {
  // Fetch all BodyDiagrams with associated Paths and Muscles
  const bodyDiagrams = await BodyDiagram.findAll({
    include: [
      {
        model: Path,
        include: [
          {
            model: Muscle,
          },
        ],
      },
    ],
  });

  // Map the fetched data to a new structure
  const result = bodyDiagrams.map((diagram) => ({
    id: diagram.id,
    path: diagram.path,
    viewMode: diagram.viewMode,
    viewAngle: diagram.viewAngle,
    // For each diagram, gather the associated muscles and their paths
    muscles: diagram.Paths.reduce((acc, path) => {
      const muscleIndex = acc.findIndex(
        (muscle) => muscle.id === path.Muscle.id
      );

      if (muscleIndex !== -1) {
        // If the muscle is already in the array, push the path to the existing muscle's paths array
        acc[muscleIndex].paths.push({
          id: path.id,
          side: path.side,
          path: path.path,
          group: path.group,
        });
      } else {
        // If the muscle is not in the array, add it along with the current path
        acc.push({
          id: path.Muscle.id,
          name: path.Muscle.name,
          partOf: path.Muscle.partOf,
          description: path.Muscle.description,
          image: path.Muscle.image,
          paths: [
            {
              id: path.id,
              side: path.side,
              path: path.path,
              group: path.group,
            },
          ],
        });
      }
      return acc;
    }, []),
  }));

  // Send the final result as JSON
  res.json(result);
});


/**
 * @description returns a bodyDiagram by viewMode and viewAngle
 * @method Get
 * @route /api/bodyDiagram/:viewMode/:viewAngle
 * @access public
 */
const getOneBodyDiagram = asyncHandler(async (req, res) => {
  const { viewMode, viewAngle } = req.params; // Extract viewMode and viewAngle from the request parameters

  // Find the BodyDiagram that matches the viewMode and viewAngle
  const bodyDiagram = await BodyDiagram.findOne({
    where: { viewMode, viewAngle },
    include: [
      {
        model: Path,
        include: [
          {
            model: Muscle,
          },
        ],
      },
    ],
  });

  // If no matching BodyDiagram is found, return a 404 error
  if (!bodyDiagram) {
    return res.status(404).json({ message: "BodyDiagram not found" });
  }

  // Format the result
  const result = {
    id: bodyDiagram.id,
    path: bodyDiagram.path,
    viewMode: bodyDiagram.viewMode,
    viewAngle: bodyDiagram.viewAngle,
    muscles: bodyDiagram.Paths.reduce((acc, path) => {
      const muscleIndex = acc.findIndex(
        (muscle) => muscle.id === path.Muscle.id
      );

      if (muscleIndex !== -1) {
        acc[muscleIndex].paths.push({
          id: path.id,
          side: path.side,
          path: path.path,
          group: path.group,
        });
      } else {
        acc.push({
          id: path.Muscle.id,
          name: path.Muscle.name,
          partOf: path.Muscle.partOf,
          description: path.Muscle.description,
          image: path.Muscle.image,
          paths: [
            {
              id: path.id,
              side: path.side,
              path: path.path,
              group: path.group,
            },
          ],
        });
      }
      return acc;
    }, []),
  };

  // Send the formatted result as JSON
  res.json(result);
});

module.exports = { getAllBodyDiagrams, getOneBodyDiagram };
