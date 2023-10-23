import { Schema, model, models } from "mongoose";

const userSchema = new Schema({
  name: { type: String, required: true },
  email: { type: String, required: true },
  password: { type: String, required: true },
  verifyUser : {type: String},
});

const user = models.user || model("user", userSchema);

export default user;
