const { Schema, model, default: mongoose } = require("mongoose");

const BlogsSchema = new Schema(
  {
    title: { type: String, required: [true, "title required"] },
    body: { type: String, required: [true, "blog content required"] },
    published: { type: String },
    publishedAt: { type: Date },
    category: {
      type: mongoose.Types.ObjectId,
      ref: "category",
      required: [true, "category required"],
    },
    userID: {
      type: mongoose.Types.ObjectId,
      ref: "users",
      required: [true, "user id required"],
    },
  },
  { timestamps: true }
);

const BlogsModel = model("blogs", BlogsSchema);
module.exports = BlogsModel;
