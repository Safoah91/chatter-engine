const { Schema, model, default: mongoose } = require("mongoose");

const BlogsSchema = new Schema(
  {
    title: { type: String, required: [true, "title required"] },
    featuredImage: {type: String, required: [true, "featured image required"]},
    body: { type: String, required: [true, "blog content required"] },
    isPublished: { type: Boolean, required: [true, 'published required']},
    publishedAt: { type: Date },
    isDrafted: {type: Boolean, required: [true, "draft required"]},
    draftedAt: {type: Date},
    readTime: {type: String, required: [true, "read time required"]},
    except: {type: String, required: [true, "except required"]},
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
