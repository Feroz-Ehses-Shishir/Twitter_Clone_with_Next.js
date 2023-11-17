import userFollowingListService from "../../../../libs/services/userFollowingListService";

export default async function handler(req, res) {
  if (req.method == "GET") {
    await userFollowingListService(req, res);
    return;
  }
}
