const mongoose = require("mongoose");

const citySchema = new mongoose.Schema(
  {
   city:{type:String}
  },
  { versionKey: false }
);
module.exports = mongoose.model("city1", citySchema);
