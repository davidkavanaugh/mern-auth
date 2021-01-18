const { Schema, model } = require("mongoose");

const UserSchema = new Schema(
  {
    firstName: {
      type: String,
      required: [true, "First Name is required"],
      minLength: [2, "First Name must be at least 2 characters"],
    },
  },
  { timestamps: true }
);
const User = model("User", UserSchema);

module.exports = User;
