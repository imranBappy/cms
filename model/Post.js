const { Schema, model } = require("mongoose");

const PostSchema = new Schema(
  {
    title: String,
    content: String,
    url: String,
    status: {
      type: String,
      enum: ["active", "inactive"],
      default: "active",
    },
    type: {
      type: String,
      default: "post",
    },
  },
  { timestamps: true }
);

module.exports = model("Post", PostSchema);
