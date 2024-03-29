import { connectMongoDB } from "../MongoConnect";
import messages from "../models/messageModel";

const messageService = async (obj) => {
  await connectMongoDB();

  try {
    const data = await messages.find({
      $or: [
        { firstUserId: obj.from, secondUserId: obj.to },
        { firstUserId: obj.to, secondUserId: obj.from },
      ],
    });

    if (data.length == 0) {
      await messages.create({
        firstUserId: obj.from,
        secondUserId: obj.to,
        chat: [
          {
            from: obj.from,
            to: obj.to,
            message: obj.message,
            seen: obj.seen,
            time: obj.time
          },
        ],
      });
    } else {
      await messages.updateOne(
        {
          $or: [
            { firstUserId: obj.from, secondUserId: obj.to },
            { firstUserId: obj.to, secondUserId: obj.from },
          ],
        },
        { $push: { chat: {
            from: obj.from,
            to: obj.to,
            message: obj.message,
            seen: obj.seen,
            time: obj.time
          } } }
      );
    }
  } catch (err) {
    console.log("Error");
  }
};

export default messageService;