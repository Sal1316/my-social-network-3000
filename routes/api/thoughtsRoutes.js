const router = require("express").Router();
const {
  getAllthoughts,
  getSingleThought,
  createThought,
  updateThought,
  deleteThought,

  // linked ones
  // createReaction,
  // deleteReaction,
} = require("../../controllers/thoughtController");

// /api/thoughts
router.route("/").get(getAllthoughts);
//
router.route("/:thoughtId").get(getSingleThought);

router.route("/").post(createThought);

router.route("/:thoughtId").put(updateThought);

router.route("/:thoughtId").delete(deleteThought);

// router.route("/:thoughtId/reactions").post(createReaction);

// router.route("/:thoughtId/reactions").delete(deleteReaction);

module.exports = router;
