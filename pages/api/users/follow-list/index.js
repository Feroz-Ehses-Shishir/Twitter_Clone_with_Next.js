import userFollowListService from "../../../../libs/services/userFollowListService";

export default async function handler(req, res) {
  if (req.method == "GET") {
    await userFollowListService(req, res);
    return;
  }
}
