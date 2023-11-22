const router = require("express").Router();
const {
  getAllthoughts,
  getSingleThought,
  createThought,
  updateThought,
  deleteThought,

  // linked ones
  addReaction,
  deleteReaction,
} = require("../../controllers/thoughtController");

// /api/thoughts
router.route("/").get(getAllthoughts).post(createThought);
//
router
  .route("/:thoughtId")
  .get(getSingleThought)
  .put(updateThought)
  .delete(deleteThought);

// router.route("/").post(createThought);

// router.route("/:thoughtId").put(updateThought);

// router.route("/:thoughtId").delete(deleteThought);

//Reactions:
router.route("/:thoughtId/reactions").post(addReaction);

router.route("/:thoughtId/reactions/:reactionId").delete(deleteReaction);

module.exports = router;
