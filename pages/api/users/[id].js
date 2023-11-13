import getByIdUserService from "../../../libs/services/getByIdUserService";
import userUpdateService from "../../../libs/services/userUpdateService";

export default async function handler(req, res) {
  if (req.method == "GET") {
      await getByIdUserService(req, res);
  }
  else if (req.method == "PATCH") {
    await userUpdateService(req, res);
  }
}
