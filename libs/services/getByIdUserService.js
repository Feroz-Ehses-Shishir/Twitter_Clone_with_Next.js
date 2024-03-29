import { connectMongoDB } from "../MongoConnect";
import user from "../models/userModel";

const postDeleteService = async (req, res) => {
    const Id = req.query.id;
    try {
      await connectMongoDB();
      const data = await user.findById(Id);
      res.status(200).send(data);
    } catch (err) {
      res.status(400).send({ err, msg: "Something went wrong!" });
    }
};

export default postDeleteService;