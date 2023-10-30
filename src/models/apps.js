const mongoose = require("mongoose");

const { Schema } = mongoose;

const appsSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
      unique: true,
    },
    webhookUrl: {
      type: String,
      required: true,
    },
    active: {
      type: Boolean,
      default: true,
    },
  },
  {
    timestamps: true,
  }
);

const Apps = mongoose.model("Apps", appsSchema);

module.exports = Apps;
