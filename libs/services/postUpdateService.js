import { connectMongoDB } from "../MongoConnect";
import post from "../models/postModel";

const postUpdateService = async (req, res) => {
    const Id = {_id: req.query.id};

    const update = {
        text : req.body.text,
        image_url : req.body.filename
    }

    try {
      await connectMongoDB();
      const data = await post.findOneAndUpdate(Id,update);
      res.status(200).send(data);
    } catch (err) {
      res.status(400).send({ err, msg: "Something went wrong!" });
    }
};

export default postUpdateService;