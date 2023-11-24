import { Schema, model, models } from "mongoose";

const messageSchema = new Schema({
  from: { type: String, required: true },
  to: { type: String, required: true },
  time: { type: Date, default: Date.now() },
  seen: { type: String, required: true },
  message: { type: String, required: true },
});

const messagesSchema = new Schema({
  firstUserId: { type: Schema.Types.ObjectId, ref: 'user' },
  secondUserId: { type: Schema.Types.ObjectId, ref: 'user' },
  chat: [messageSchema],
});

const messages = models.messages || model("messages", messagesSchema);

export default messages;
