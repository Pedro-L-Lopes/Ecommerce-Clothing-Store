const mongoose = require("mongoose");
const { schema } = mongoose;

const userSchema = new schema(
  {
    name: String,
    email: String,
    password: String,
    profileImage: String,
  },
  {
    timestamps: true,
  }
);

const User = mongoose.model("User", userSchema); // Defindo um model com nome "user" e passando um schema "userSchema"

module.exports = User;
