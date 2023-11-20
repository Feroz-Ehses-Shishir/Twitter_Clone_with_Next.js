import { connectMongoDB } from "../MongoConnect";
import post from "../models/postModel";
import user from "../models/userModel";

const postGetService = async (req, res) => {
  const Id = req.query.id;   
  try {
    await connectMongoDB();
    const userData = await user.findById(Id);
    userData?.following?.push(Id);
    const data = await post.find({$or:[{type: "post"},{type: "reTweet"}],userId:{$in:userData.following}}).populate({
      path: 'reTweetPostId',
      model: 'post',
      populate: {
        path: 'userId',
        model: 'user',
      }
    }).populate({
      path: 'userId',
      model: 'user',
    }).populate({
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
    }).sort({ createdAt: -1 });
    res.status(200).send(data);
    return data;
  } catch (err) {
    res.status(500).send({ err, msg: "Something went wrong!" });
  }
};

export default postGetService;