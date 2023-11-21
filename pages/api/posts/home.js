import postDeleteService from "../../../libs/services/postDeleteService";
import postUpdateService from "../../../libs/services/postUpdateService";
import postLikeService from "../../../libs/services/postLikeService";
import postGetService from "../../../libs/services/postGetService";

export default async function handler(req, res) {
  if (req.method == "DELETE") {
    await postDeleteService(req, res);
  } else if (req.method == "PATCH") {
    if (req.body.likedId == undefined) {
      await postUpdateService(req, res);
    } else {
      await postLikeService(req, res);
    }
  }else if (req.method == "GET") {
    await postGetService(req,res);
  }
}
