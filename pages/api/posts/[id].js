import postDeleteService from "../../../libs/services/postDeleteService";
import postUpdateService from "../../../libs/services/postUpdateService";
import postLikeService from "../../../libs/services/postLikeService";

export default async function handler(req, res) {
  if (req.method == "DELETE") {
    await postDeleteService(req, res);
  } else if (req.method == "PATCH") {
    if (req.body.likedId == undefined) {
      await postUpdateService(req, res);
    } else {
      await postLikeService(req, res);
    }
  }
}
