const router = require("express").Router();
const {
  getAllthoughts,
  getSingleThought,
  createThought,
  updateThought,
  deleteThought,

  // linked ones
  addReaction,
  // deleteReaction,
} = require("../../controllers/thoughtController");

// /api/thoughts
router.route("/").get(getAllthoughts);
//
router.route("/:thoughtId").put(updateThought);
router.route("/:thoughtId").get(getSingleThought);

router.route("/").post(createThought);

// router.route("/:thoughts/:thoughtId/reactions").delete(deleteReaction);

router.route("/:thoughtId").delete(deleteThought);

router.route("/:thoughtId/reactions").post(addReaction);

module.exports = router;
