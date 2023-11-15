import { connectMongoDB } from "../MongoConnect";
import user from "../models/userModel";

const userFollowService = async (req, res) => {
    const Id = req.query.id;
    try {
      await connectMongoDB();
      const userData = await user.findById(Id);
      // userData.following.push(Id);
      const data = await user.find({_id:{$nin:userData.following}});
      res.status(200).send(data);
    } catch (err) {
      res.status(400).send({ err, msg: "Something went wrong!" });
    }
};

export default userFollowService;