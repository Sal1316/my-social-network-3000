const { Schema, model } = require("mongoose");
const assignmentSchema = require("./Assignment");

// Schema to create Student model
const thoughSchema = new Schema(
  {
    thoughtText: {
      type: String,
      required: true,
      maxlength: 280,
    },
    createdAt: {
      type: Date,
      default: Date.now,
      get: (timestamp) => dateFormat(timestamp),
    },
    username: {
      type: String,
      required: true,
    },
    reactions: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Reaction",
      },
    ],
  },
  {
    toJSON: {
      getters: true,
    },
  }
);

const Thought = model("Thought", userSchema);

module.exports = Thought;
