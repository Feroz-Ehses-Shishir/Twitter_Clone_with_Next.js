import userService from "../../../libs/services/userService";

export default async function handler(req, res) {
  if (req.method == "POST") {
    await userService(req,res);
    return;
  }
}
