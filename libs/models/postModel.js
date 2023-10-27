import { Schema, model, models } from "mongoose";

const postSchema = new Schema({
  userId: { type: String, required: true },
  text: { type: String, required: true },
  img: { type: String },
  type: { type: String, required: true },
  parentId: { type: String, required: true },
});

const post = models.post || model("post", postSchema);

export default post;