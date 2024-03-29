import { connectMongoDB } from "../MongoConnect";
import messages from "../models/messageModel";

const allMessageService = async (req,res) => {
  const from = req.query.id_1;
  const to = req.query.id_2;

  await connectMongoDB();
  try {
    const data = await messages.find({
      $or: [
        { firstUserId: from, secondUserId: to },
        { firstUserId: to, secondUserId: from },
      ],
    }).populate({
      path: 'firstUserId',
      model: 'user',
    }).populate({
      path: 'secondUserId',
      model: 'user',
    });
    res.status(200).send(data[0]);

  } catch (err) {
    res.status(400).send({ err, msg: "Something went wrong!" });
  }
};

export default allMessageService;
