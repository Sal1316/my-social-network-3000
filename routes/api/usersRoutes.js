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
router.route("/").get(getAllUsers);
//
router.route("/:userId").get(getSingleUser);

router.route("/").post(createUser);

router.route("/:userId").put(updateUser);

router.route("/:userId/friends/:friendId").delete(deleteFriend);
/* causing an error if this line is last bc others execute first.
router.route("/:userId/friends/:friendId").post(addFriend).delete(deleteFriend) 
   this is chaining. You can putl multiple HTTP methods in one single route. Doing this
   will allow the route to handle both POST and DELETE. Meaning 'either', Post or Delete.
*/

router.route("/:userId").delete(deleteUser);

router.route("/:userId/friends/:friendId").post(addFriend);

module.exports = router;
