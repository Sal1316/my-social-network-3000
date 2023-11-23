const router = require("express").Router();
const {
  getAllUsers,
  getSingleUser,
  createUser,
  updateUser,
  deleteUser,

  // linked ones
  addFriend,
  deleteFriend,
} = require("../../controllers/userController");

// /api/thoughts
router.route("/").get(getAllUsers).post(createUser);
router.route("/:userId").get(getSingleUser).put(updateUser).delete(deleteUser);
router.route("/:userId/friends/:friendId").post(addFriend).delete(deleteFriend);

module.exports = router;

/* NOTES: 
  router.route("/:userId/friends/:friendId").post(addFriend).delete(deleteFriend) 
   this is chaining. If you dont chain, you might get errror with some enpoint pucking up the wrong route. Doing this
   will allow the route to handle both POST and DELETE. Meaning 'either', Post or Delete.
*/
