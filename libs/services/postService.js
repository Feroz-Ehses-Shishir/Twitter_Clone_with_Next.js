import { connectMongoDB } from "../MongoConnect";
import post from "../models/postModel";

const postService = async (req, res) => {
  const { userId, text, image_url, type, parentId, fId } = req.body;
  await connectMongoDB();   
  try {
    const data = await post.create({ userId, text, image_url, type, parentId, fId });

    if(type!=="post"){
      const data2 = await post.updateOne(
        { _id: parentId },
        { $push: { comments: data._id } },
     )
    }
    res.status(200).send(data);
  } catch (err) {
    res.status(500).send({ err, msg: "Something went wrong!" });
  }

};

export default postService;