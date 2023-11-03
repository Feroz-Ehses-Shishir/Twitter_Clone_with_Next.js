import postDeleteService from "../../../libs/services/postDeleteService";

export default async function handler(req, res) {
  
    if (req.method == "DELETE") {
        await postDeleteService(req,res);
    }

}
