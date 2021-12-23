const mongoose = require("mongoose");

const vlogSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "mediuser",
      require: true,
    },
    title: { type: String, required: true },
    text: { type: String },
    des: { type: String },
    date: { type: String },
    blogimg: { type: String },
    likes: { type: Number },
    img:{type:String},
    comments: [{ type: String }],
    tags: [{ type: String }],
  },
  { versionKey: false, timestamps: true }
);

const User = mongoose.model("mvlog", vlogSchema);

module.exports = User;
