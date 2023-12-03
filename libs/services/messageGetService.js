import { connectMongoDB } from "../MongoConnect";
import messages from "../models/messageModel";

const messageGetService = async (obj, type) => {
  await connectMongoDB();

  if (type == "first") {
    try {
      const form = obj?.from;
      // console.log(form);
      
      await messages.updateMany(
        {
          $or: [
            { firstUserId: obj.from, secondUserId: obj.to },
            { firstUserId: obj.to, secondUserId: obj.from },
          ],
          "chat.to": form,
        },
        { $set: { "chat.$[].seen": "Yes" } }
      );
    } catch (err) {
      console.log(err,"first Error");
    }
  } else if (type == "seen") {
    try {
      await messages.updateOne(
        {
          $or: [
            { firstUserId: obj.from, secondUserId: obj.to },
            { firstUserId: obj.to, secondUserId: obj.from },
          ],
          "chat._id": obj.id,
        },
        { $set: { "chat.$.seen": "Yes" } }
      );
    } catch (err) {
      console.log("Error");
    }
  } else {
    try {
      const data = await messages.find({
        $or: [
          { firstUserId: obj.from, secondUserId: obj.to },
          { firstUserId: obj.to, secondUserId: obj.from },
        ],
      });
      return data[0].chat.slice(-1)[0];
    } catch (err) {
      console.log("Error");
    }
  }
};

export default messageGetService;
