const { model, Schema } = require("mongoose");

const SettingSchema = new Schema({
  type: String,
  componentName: String,
  componentLocation: String,
  componentPosition: {
    type: String,
    enum: ["left", "right"],
    default: "left",
  },
  componentStatus: {
    type: String,
    enum: ["active", "inactive"],
    default: "active",
  },
});

module.exports = model("Setting", SettingSchema);
