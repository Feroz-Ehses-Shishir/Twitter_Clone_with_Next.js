import { connectMongoDB } from "../MongoConnect";
import post from "../models/postModel";

const postDeleteService = async (req, res) => {
    const Id = req.query.id;
    try {
      await connectMongoDB();
      await post.findByIdAndDelete(Id);
      res.status(200).send("Deleted");
    } catch (err) {
      res.status(400).send({ err, msg: "Something went wrong!" });
    }
};

export default postDeleteService;