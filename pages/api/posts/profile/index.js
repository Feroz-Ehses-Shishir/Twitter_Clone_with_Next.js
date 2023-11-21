import postGetByProfileService from "../../../../libs/services/postGetByProfileService"

export default async function handler(req, res) {
  if (req.method == "GET") {
    await postGetByProfileService(req, res);
  }
}
