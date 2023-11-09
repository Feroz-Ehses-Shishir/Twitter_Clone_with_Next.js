import { connectMongoDB } from "../MongoConnect";
import post from "../models/postModel";

const postLikeService = async (req, res) => {
  const Id = { _id: req.query.id };

  const { likedId, isLiked } = req.body;

  try {
    await connectMongoDB();
    if (!isLiked) {
      await post.updateOne(Id, { $push: { liked: likedId } });
    } else {
      await post.updateOne(Id, { $pull: { liked: likedId } });
    }

    res.status(200).send("Ok");
  } catch (err) {
    res.status(400).send({ err, msg: "Something went wrong!" });
  }
};

export default postLikeService;
