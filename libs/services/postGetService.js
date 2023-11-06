import { connectMongoDB } from "../MongoConnect";
import post from "../models/postModel";

const postGetService = async (req, res) => {
  await connectMongoDB();   
  try {
    const data = await post.find().populate('userId').populate({
      path: 'comments',
      populate: {
        path: 'comments',
        model: 'post',
      }
    });
    res.status(200).send(data);
    return data;
  } catch (err) {
    res.status(500).send({ err, msg: "Something went wrong!" });
  }
};

export default postGetService;