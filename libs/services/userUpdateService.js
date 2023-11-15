import { connectMongoDB } from "../MongoConnect";
import user from "../models/userModel";

const postUpdateService = async (req, res) => {
  const Id = { _id: req.query.id };

  const update = {
    name: req.body.name,
    bio: req.body.bio,
    img: req.body.img,
    cover: req.body.cover,
  };

  try {
    await connectMongoDB();

    if (req.body.follow === undefined) {
      const data = await user.findOneAndUpdate(Id, update);
      res.status(200).send(data);
    }
    else{
      const userId = { _id: req.body.user_id };
      let data;
      if (!req.body.follow) {
        data = await user.updateOne(Id, { $push: { following: req.body.user_id } });
        await user.updateOne(userId, { $push: { followers: req.query.id } });
        res.status(200).send(data);
      } else {
        data = await user.updateOne(Id, { $pull: { following: req.body.user_id } });
        await user.updateOne(userId, { $pull: { followers: req.query.id } });
        res.status(200).send(data);
      }
    }

  } catch (err) {
    res.status(400).send({ err, msg: "Something went wrong!" });
  }
};

export default postUpdateService;
