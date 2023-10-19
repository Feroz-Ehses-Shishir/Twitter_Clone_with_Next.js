import userService from "../../../libs/services/userService";
import signUpValidate from "../../../libs/validates/signUpValidate";

export default async function handler(req, res) {
  if (req.method == "POST") {
    const varify = signUpValidate(req);
    if (varify == "OK") {
      await userService(req, res);
    } else {
      res.status(400).send(varify);
    }
    return;
  }
}
