import postDeleteService from "../../../libs/services/postDeleteService";
import postUpdateService from "../../../libs/services/postUpdateService";

export default async function handler(req, res) {
  
    if (req.method == "DELETE") {
        await postDeleteService(req,res);
    }
    else if (req.method == "PATCH") {
        await postUpdateService(req,res);
    }

}
