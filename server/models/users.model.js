const bcrypt = require("bcrypt");
const { Schema, model } = require("mongoose");
const UserSchema = new Schema(
  {
    firstName: {
      type: String,
      required: [true, "first name is required"],
      minlength: [2, "first name must be 2 characters or longer"],
    },
    lastName: {
      type: String,
      required: [true, "last name is required"],
      minlength: [2, "last name must be 2 characters or longer"],
    },
    email: {
      type: String,
      required: [true, "email is required"],
      validate: {
        validator: (val) => /^([\w-\.]+@([\w-]+\.)+[\w-]+)?$/.test(val),
        message: "please enter a valid email address",
      },
    },
    password: {
      type: String,
      required: [true, "password is required"],
      validate: {
        validator: (val) =>
          /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@~!#$%^&*?/+-])[A-Za-z\d@~!#$%^&*?/+-]{8,}$/.test(
            val
          ),
        message:
          "passwords must be at least 8 characters, contain one uppercase letter, one lowercase letter, and one special character",
      },
    },
  },
  { timestamps: true }
);

UserSchema.virtual("confirmPassword")
  .get(() => this._confirmPassword)
  .set((value) => (this._confirmPassword = value));

UserSchema.pre("validate", function (next) {
  if (this.password !== this.confirmPassword) {
    this.invalidate("confirmPassword", "passwords must match");
  }
  next();
});

UserSchema.pre("validate", async function (next) {
  try {
    const exists = await User.exists({ email: this.email });
    exists && this.invalidate("email", "user already exists");
    next();
  } catch (err) {
    console.log(err);
  }
});

UserSchema.pre("save", function (next) {
  bcrypt.hash(this.password, 10).then((hash) => {
    this.password = hash;
    next();
  });
});

const User = model("User", UserSchema);

module.exports = User;
