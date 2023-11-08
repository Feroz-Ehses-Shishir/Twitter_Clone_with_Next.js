import { connectMongoDB } from "../MongoConnect";
import post from "../models/postModel";

const postGetService = async (req, res) => {
  await connectMongoDB();
  const condition = { type: "post" };   
  try {
    const data = await post.find(condition).populate('userId').populate({
      path: 'comments',
      populate: [{
        path: 'comments',
        model: 'post',
        populate: {
          path: 'userId',
          model: 'user',
        }
      },{
        path: 'userId',
        model: 'user',
      }]
    });
    res.status(200).send(data);
    return data;
  } catch (err) {
    res.status(500).send({ err, msg: "Something went wrong!" });
  }
};

export default postGetService;