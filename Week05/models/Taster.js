const mongoose = require("mongoose");
const { Schema } = mongoose;

const tasterSchema = new Schema(
  {
    twitter: String,
    tastings: { type: Number, default: 0 },
    name: String,
  },
  { timestamps: true }
);

module.exports = mongoose.model("Taster", tasterSchema);