import { connectMongoDB } from "../MongoConnect";
import user from "../models/userModel";

const userFollowingService = async (req, res) => {
    try {
      await connectMongoDB();
      const userData = req.body.data;
      const data = await user.find({_id:{$in:userData},verifyUser:{$nin:"No"}});
      res.status(200).send(data);
    } catch (err) {
      res.status(400).send({ err, msg: "Something went wrong!" });
    }
};

export default userFollowingService;