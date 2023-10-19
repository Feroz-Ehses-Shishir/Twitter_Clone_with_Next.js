import { connectMongoDB } from "../MongoConnect";
import user from "../models/userModel";
import bcrypt from "bcryptjs";

const userService = async (req, res) => {
  const { name, email, password } = req.body;
  const hashedPassword = await bcrypt.hash(password,10);
  await connectMongoDB();
  try {
    const data = await user.create({ name, email, password:hashedPassword });
    res.status(201).send(data);
  } catch (err) {
    res.status(400).send({ err, msg: "Something went wrong!" });
  }

};

export default userService;
