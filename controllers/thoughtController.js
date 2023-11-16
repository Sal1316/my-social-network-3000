const { User, Thought } = require("../models");

module.exports = {
  // Get all thoughts   .. DOne
  async getAllthoughts(req, res) {
    try {
      const thoughts = await Thought.find();
      res.json(thoughts);
    } catch (err) {
      res.status(500).json(err);
    }
  },

  // Get one Thought  .. DONE
  async getSingleThought(req, res) {
    const { thoughtId } = req.params;

    try {
      const thought = await Thought.findOne({ _id: thoughtId });

      if (!thought) {
        return res.status(404).json({ message: "No thought with that ID" });
      }

      res.json(thought);
    } catch (err) {
      res.status(500).json(err);
    }
  },

  // 'POST' Create a Though ...DONE
  async createThought(req, res) {
    const { thoughtText, username, userId } = req.body;

    try {
      const newThought = await Thought.create({
        thoughtText: thoughtText,
        username: username,
      });

      /* 
      // there is no userId being passed in bc the url does not have that value. 
        I dont think that updating the thoughts in User ne3ed to be here.
      await User.findByIdAndUpdate(
        { _id: userId },
        { $addToSet: { thoughts: newThought } },
        { runValidators: true, new: true }
      ); // links thought to User.
      */

      res.json(newThought);
    } catch (err) {
      console.log(err);
      return res.status(500).json(err);
    }
  },

  // 'PUT' Update a Thought by id.
  async updateThought(req, res) {
    try {
      // NOT UPDATING THE THOUGHT. They body might not by the right format.
      const thought = await Thought.findOneAndUpdate(
        { _id: req.params.thoughtId },
        { $set: req.body },
        { runValidators: false, new: true }
      );
      console.log("THOUGHT OBJ: ", thought);

      if (!thought) {
        return res.status(404).json({ message: "No thought with this id!" });
      }

      res.json(thought);
    } catch (err) {
      res.status(500).json(err);
    }
  },

  // Delete a Thought by id. DONE...
  async deleteThought(req, res) {
    console.log("Delete Thought Route");
    try {
      const thought = await Thought.findOneAndDelete({
        _id: req.params.thoughtId,
      });

      if (!thought) {
        return res.status(404).json({ message: "No tHOUGHT with that ID" });
      }

      res.json({ message: "thought deleted!" });
    } catch (err) {
      res.status(500).json(err);
    }
  },

  /* 
  Need this endpoint too: api/thoughts/:thoughtId/reactions
  */

  // `POST` to create a reaction stored in a single thought's `reactions` array field
  async addReaction(req, res) {
    const { userId, friendId } = req.params;

    try {
      const userInfo = await User.findByIdAndUpdate(
        { _id: userId },
        { $addToSet: { reaction: reactionId } }, // adding to the friend array in the users.
        { runValidators: true, new: true }
      );
      res.status(200).json({ message: userInfo });
    } catch (err) {
      console.log(err);
      return res.status(500).json(err);
    }
  },

  // `DELETE` to pull and remove a reaction by the reaction's `reactionId` value
  async deleteReaction(req, res) {
    const { userId, friendId } = req.params;

    try {
      const updatedUser = await User.findOneAndUpdate(
        { _id: userId },
        { $pull: { reaction: reactionId } }, // adding to the Reaction array in the users.
        { runValidators: true, new: true }
      );

      if (!updatedUser) {
        return res.status(404).json({ message: "No Reaction with that ID" });
      }

      res.json({ message: "Reaction deleted!" });
    } catch (err) {
      res.status(500).json(err);
    }
  },
};
