const { User, Thought } = require("../models");

module.exports = {
  // DOne.... Get all thoughts
  async getAllthoughts(req, res) {
    try {
      const thoughts = await Thought.find();
      res.json(thoughts);
    } catch (err) {
      res.status(500).json(err);
    }
  },

  // DONE... Get one Thought   DONE
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

  // DONE... 'POST' Create a Though
  async createThought(req, res) {
    const { thoughtText, username, userId } = req.body;

    try {
      const newThought = await Thought.create({
        thoughtText: thoughtText,
        username: username,
      });

      // I dont think that updating the thoughts in User ne3ed to be here.
      await User.findByIdAndUpdate(
        { _id: userId },
        { $push: { thoughts: newThought._id } },
        { new: true }
      ); // links thought to User.

      res.json(newThought);
    } catch (err) {
      console.log(err);
      return res.status(500).json(err);
    }
  },

  // Done...
  async updateThought(req, res) {
    try {
      // console.log(" 🐛 Request body to UPDATE", req.body);
      // console.log(" 🐛 Id:", req.params.thoughtId);

      const thought = await Thought.findOneAndUpdate(
        { _id: req.params.thoughtId },
        { $set: req.body },
        { runValidators: false, new: true }
      );
      console.log(" 🐛 UPDated THOUGHT: ", thought); // Returning the original thought. Not updating

      if (!thought) {
        return res.status(404).json({ message: "No thought with this id!" });
      }

      res.json(thought);
    } catch (err) {
      res.status(500).json(err);
    }
  },

  // DONE... Delete a Thought by id.
  async deleteThought(req, res) {
    console.log("Delete Thought Route");
    try {
      const thought = await Thought.findOneAndRemove({
        _id: req.params.thoughtId,
      });

      if (!thought) {
        return res.status(404).json({ message: "No tHOUGHT with that ID" });
      }
      const userData = await User.findOneAndUpdate(
        { thoughts: req.params.thoughtId },
        { $pull: { thoughts: req.params.thoughtId } },
        { new: true }
      );

      res.json({ message: "thought deleted!" });
    } catch (err) {
      res.status(500).json(err);
    }
  },

  // REACTIONS:
  // DONE...
  async addReaction(req, res) {
    const { thoughtId } = req.params;
    console.log("thoughtId from addReaction::", thoughtId);
    const { reactionBody, username } = req.body;
    console.log("req.body from addReaction::", req.body);

    try {
      const reaction = await Thought.findByIdAndUpdate(
        { _id: thoughtId },
        {
          $push: {
            reactions: {
              reactionBody,
              username: username,
            },
          },
        },
        { runValidators: true, new: true }
      );

      console.log(reaction);

      if (!reaction) {
        return res.status(404).json({ message: "No thought with that ID" });
      }

      res.status(200).json(reaction);
    } catch (err) {
      console.log(err);
      return res.status(500).json(err);
    }
  },

  // DONE...
  async deleteReaction(req, res) {
    const { reactionId, thoughtId } = req.params;

    try {
      const updatedThought = await Thought.findOneAndUpdate(
        { _id: thoughtId },
        { $pull: { reactions: { reactionId } } }, // adding to the Reaction array in the users.
        { runValidators: true, new: true }
      );

      if (!updatedThought) {
        return res.status(404).json({ message: "No Reaction with that ID" });
      }

      res.json({ message: "Reaction deleted!" });
    } catch (err) {
      res.status(500).json(err);
    }
  },
};
