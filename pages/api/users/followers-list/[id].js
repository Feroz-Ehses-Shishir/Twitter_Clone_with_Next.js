import userFollowersListService from "../../../../libs/services/userFollowersListService";

export default async function handler(req, res) {
  if (req.method == "GET") {
    await userFollowersListService(req, res);
    return;
  }
}
