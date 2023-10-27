import postService from "../../../libs/services/postService";
import postValidate from "../../../libs/validates/postValidate";
import postGetService from "../../../libs/services/postGetService";

export default async function handler(req, res) {
  if (req.method == "POST") {
    const varify = postValidate(req);

    if (varify != "Not Ok") {
      await postService(req, res);
    } else {
      res.status(400).send(varify);
    }

    return;
  } else if (req.method == "GET") {
    await postGetService(req);
  }
}
