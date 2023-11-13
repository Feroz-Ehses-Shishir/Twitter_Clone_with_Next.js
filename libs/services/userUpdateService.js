import { connectMongoDB } from "../MongoConnect";
import user from "../models/userModel";

const postUpdateService = async (req, res) => {
    const Id = {_id: req.query.id};
    const update = {
        name : req.body.name,
        bio : req.body.bio,
        img : req.body.img,
        cover : req.body.cover
    }

    try {
      await connectMongoDB();
      const data = await user.findOneAndUpdate(Id,update);
      
      res.status(200).send(data);
    } catch (err) {
      res.status(400).send({ err, msg: "Something went wrong!" });
    }
};

export default postUpdateService;