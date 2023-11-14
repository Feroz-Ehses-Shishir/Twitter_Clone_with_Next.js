import userFollowService from "../../../../libs/services/userFollowService";
import userUpdateService from "../../../../libs/services/userUpdateService";

export default async function handler(req, res) {
  if (req.method == "GET") {
    await userFollowService(req, res);
    return;
  } else if (req.method == "PATCH") {
    await userUpdateService(req, res);
  }
}
