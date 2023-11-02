import { connectMongoDB } from "../MongoConnect";
import user from "../models/userModel";
import bcrypt from "bcrypt";

const userService = async (req, res) => {
  const { name, email, img, password } = req.body;
  const hashedPassword = await bcrypt.hash(password,10);
  await connectMongoDB();
  try {
    const data = await user.create({ name, email, password:hashedPassword, verifyUser: "No" });
    res.status(200).send(data);
  } catch (err) {
    res.status(500).send({ err, msg: "Something went wrong!" });
  }

};

export default userService;
