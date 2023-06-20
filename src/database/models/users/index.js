const { Schema, model } = require("mongoose");

const UserSchema = new Schema(
  {
    firstName: {
      type: String,
      required: [true, "first name required"],
    },
    lastName: {
      type: String,
      required: [true, "last name required"],
    },

    joinAs: {
      type: String,
      required: [true, "join as required"],
    },
    email: {
      type: String,
      required: [true, "email address required"],
      unique: true,
    },
    password: {
      type: String,
      required: [true, "password required"],
    },
  },
  { timestamps: true }
);

const UserModel = model("users", UserSchema);
module.exports = UserModel;
