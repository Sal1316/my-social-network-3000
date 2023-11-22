const { User, Thought } = require("../models"); // bc it accesses the index file first.

module.exports = {
  // Get all USERS
  async getAllUsers(req, res) {
    try {
      const users = await User.find().populate("friends").populate("thoughts");
      res.json(users);
    } catch (err) {
      console.log("error from UserControls:", err);
      res.status(500).json({ message: err.message });
    }
  },

  // Get 1 USER
  async getSingleUser(req, res) {
    try {
      const user = await User.findOne({ _id: req.params.userId })
        .populate("friends")
        .populate("thoughts");

      if (!user) {
        return res.status(404).json({ message: "No user with that ID" });
      }

      res.json(user);
    } catch (err) {
      res.status(500).json(err);
    }
  },

  // 'POST' Create a USER
  async createUser(req, res) {
    try {
      const user = await User.create({
        username: req.body.username,
        email: req.body.email,
      });

      res.json(user);
    } catch (err) {
      console.log(err);
      return res.status(500).json(err);
    }
  },

  // 'PUT' Update a USER by id.
  async updateUser(req, res) {
    try {
      const user = await User.findOneAndUpdate(
        { _id: req.params.userId },
        { $set: req.body },
        { runValidators: true, new: true }
      );

      if (!user) {
        return res.status(404).json({ message: "No user with this id!" });
      }

      res.json(user); // do i need the plain=true?
    } catch (err) {
      res.status(500).json(err);
    }
  },

  // Delete a User by id.
  async deleteUser(req, res) {
    try {
      const user = await User.findOneAndDelete({
        _id: req.params.userId,
      });
      await Thought.deleteMany({ _id: { $in: user.thoughts } });
      if (!user) {
        return res.status(404).json({ message: "No User with that ID" });
      }

      res.json({ message: "User deleted!" });
    } catch (err) {
      res.status(500).json(err);
    }
  },

  /*
  Need this endpoint too:  `/api/users/:userId/friends/:friendId`
  */
  // Add a new friend to a user's friend list
  async addFriend(req, res) {
    const { userId, friendId } = req.params;

    try {
      const userInfo = await User.findByIdAndUpdate(
        { _id: userId },
        { $addToSet: { friends: friendId } }, // adding to the friend array in the users.
        { runValidators: true, new: true }
      );
      res.status(200).json({ message: userInfo });
    } catch (err) {
      console.log(err);
      return res.status(500).json(err);
    }
  },

  // `DELETE` to pull and remove a reaction by the reaction's `reactionId` value
  async deleteFriend(req, res) {
    const { userId, friendId } = req.params;

    try {
      const updatedUser = await User.findOneAndUpdate(
        { _id: userId },
        { $pull: { friends: friendId } }, // adding to the friend array in the users.
        { runValidators: true, new: true }
      );

      if (!updatedUser) {
        return res.status(404).json({ message: "No Friend with that ID" });
      }

      res.json({ message: "Friend deleted!" });
    } catch (err) {
      res.status(500).json(err);
    }
  },
};
