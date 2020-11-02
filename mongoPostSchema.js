const mongoose = require("mongoose");

const Schema = mongoose.Schema;
const postSchema = new Schema(
  {
    postId: Number,
    title: String,
    tags: [String],
    img: String,
    textContent: String
  },
  {
    collection: "posts"
  }
);

module.exports = mongoose.model('Post', postSchema);
