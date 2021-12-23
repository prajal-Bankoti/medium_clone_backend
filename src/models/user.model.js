const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
  {
    name: { type: String },
    email: { type: String },
    img: { type: String },
    bio: { type: String },
    work: { type: String }
  },
  { versionKey: false }
);

const User = mongoose.model("mediuser", userSchema);

module.exports = User;
