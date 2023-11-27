import allMessageService from "../../libs/services/allMessageService";

export default async function handler(req, res) {
  if (req.method == "GET") {
    await allMessageService(req,res);
    return;
  } 
}