const { Schema, model } = require("mongoose");
const assignmentSchema = require("./Assignment");

// Schema to create Student model
const userSchema = new Schema(
  {
    reactionId: {},// I think this is created by mongoose.
    reactionBody: {
      type: String,
      required: true,
      maxlength: 280,
    },
    username: {
      type: String,
      required: true,
    },
    createdAt: {
      type: Date,
      default: Date.now,
      get: (timestamp) => dateFormat(timestamp),
    },
  },
  {
    toJSON: {
      getters: true,
    },
  }
);

const User = model("User", userSchema);

module.exports = User;
