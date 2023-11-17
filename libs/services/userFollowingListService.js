import { connectMongoDB } from "../MongoConnect";
import user from "../models/userModel";

const userFollowingService = async (req, res) => {
  const Id = req.query.id;
    try {
      await connectMongoDB();
      const userData = await user.findById(Id);
      const data = await user.find({_id:{$in:userData.following},verifyUser:{$nin:"No"}});
      res.status(200).send(data);
    } catch (err) {
      res.status(400).send({ err, msg: "Something went wrong!" });
    }
};

export default userFollowingService;