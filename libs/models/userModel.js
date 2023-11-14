import { Schema, model, models } from "mongoose";

const userSchema = new Schema({
  name: { type: String, required: true },
  email: { type: String, required: true },
  password: { type: String, required: true },
  img: { type: String},
  cover: { type: String},
  bio: { type: String},
  following: [{ type: String }],
  followers: [{ type: String }],
  posts: [{ type: String }],
  verifyUser : {type: String},
},{ timestamps: true });

const user = models.user || model("user", userSchema);

export default user;
