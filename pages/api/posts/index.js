import postService from "../../../libs/services/postService";
import postValidate from "../../../libs/validates/postValidate";

export default async function handler(req, res) {
  if (req.method == "POST") {
    const varify = postValidate(req);

    if (varify != "Not Ok") {
      await postService(req, res);
    } else {
      res.status(400).send(varify);
    }

    return;
  } 
}
