const { Thought } = require("../models");

module.exports = {
  // Get all thoughts
  async getAllthoughts(req, res) {
    try {
      const thoughts = await Thought.find();
      res.json(thoughts);
    } catch (err) {
      res.status(500).json(err);
    }
  },

  // Get one Thought
  async getSingleThought(req, res) {
    const { thoughtId } = req.params;
    try {
      const thought = await Thought.findOne({ thoughtId });

      if (!thouht) {
        return res.status(404).json({ message: "No thought with that ID" });
      }

      res.json(thought);
    } catch (err) {
      res.status(500).json(err);
    }
  },

  // 'POST' Create a Though
  async createThought(req, res) {
    const { thoughtText, username, userId } = req.body;

    try {
      const newThought = await Thought.create({
        thoughtText: req.body.thoughtText,
        username: req.body.username,
      });

      await User.findByIdAndUpdate(userId, {
        $push: { thoughts: newThought._id },
      }); // links thought to User.

      res.json(newThought);
    } catch (err) {
      console.log(err);
      return res.status(500).json(err);
    }
  },

  // 'PUT' Update a Thought by id.
  async updateThought(req, res) {
    try {
      const thought = await Thought.findOneAndUpdate(
        { _id: req.params.userId },
        { $set: req.body },
        { runValidators: true, new: true }
      );

      if (!thought) {
        return res.status(404).json({ message: "No thought with this id!" });
      }

      res.json(thought);
    } catch (err) {
      res.status(500).json(err);
    }
  },

  // Delete a Thought by id.
  async deleteThought(req, res) {
    try {
      const thought = await Thought.findOneAndDelete({
        _id: req.params.userId,
      });

      if (!thought) {
        return res.status(404).json({ message: "No User with that ID" });
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
  async createReaction(req, res) {
    const { thoughtText, username, userId } = req.body;

    try {
      const newThought = await Reaction.create({
        thoughtText: "Here's a cool thought...",
        username: "sal45",
        userId: userId,
      });

      await User.findByIdAndUpdate(userId, {
        $push: { thoughts: newThought._id },
      }); // links thought to User.

      res.json(newThought);
    } catch (err) {
      console.log(err);
      return res.status(500).json(err);
    }
  },

  // `DELETE` to pull and remove a reaction by the reaction's `reactionId` value
  async deleteReaction(req, res) {
    try {
      const thought = await Thought.findOneAndDelete({
        _id: req.params.userId,
      });

      if (!thought) {
        return res.status(404).json({ message: "No User with that ID" });
      }

      res.json({ message: "thought deleted!" });
    } catch (err) {
      res.status(500).json(err);
    }
  },
};
