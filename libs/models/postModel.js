import { Schema, model, models } from "mongoose";

const postSchema = new Schema({
  userId: { type: Schema.Types.ObjectId, ref: 'user' },
  reTweetPostId: { type: Schema.Types.ObjectId, ref: 'post' },
  text: { type: String },
  image_url: { type: String },
  type: { type: String, required: true },
  parentId: { type: String },
  comments: [{ type: Schema.Types.ObjectId, ref: 'post' }],
  liked: [{ type: String }],
},{ timestamps: true });

const post = models.post || model("post", postSchema);

export default post;
