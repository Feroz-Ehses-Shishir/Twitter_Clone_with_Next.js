import { connectMongoDB } from "../MongoConnect";
import post from "../models/postModel";
import user from "../models/userModel";

const postDeleteService = async (req, res) => {
    const Id = req.query.id;
    try {
      await connectMongoDB();
      const data = await post.findByIdAndDelete(Id);
      if(data.type=="comment"){
        await post.deleteMany({_id:{$in:data.comments}})
      }
      else if(data.type=="post"){
        await post.deleteMany({_id:{$in:data.comments}})
        await post.deleteMany({parentId:{$in:data.comments}})
        await user.updateOne({ _id: data.userId }, { $pull: { posts: Id } });
      }
      res.status(200).send("Deleted");
    } catch (err) {
      res.status(400).send({ err, msg: "Something went wrong!" });
    }
};

export default postDeleteService;