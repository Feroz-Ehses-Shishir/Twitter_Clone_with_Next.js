import fs from "fs";
import { IncomingForm, File } from 'formidable';
import path from "path";

export const config = {
  api: {
    bodyParser: false,
  },
};

export default async function handler(req, res) {
  const form = new IncomingForm();
  form.uploadDir = path.join(process.cwd(), "public/images"); // Set the upload directory

  form.parse(req, async (err, fields, files) => {
    if (err) {
      return res.status(500).json({ error: "File upload failed." });
    }

    // console.log(files.file.path);
    const oldPath = files.file.path;
    const extension = path.extname(files.file.name);
    const newPath = path.join(form.uploadDir, Date.now() + extension);

    fs.rename(oldPath, newPath, async (error) => {
      if (error) {
        return res.status(500).json({ error: "File upload failed." });
      }

      return res.status(200).json({ message: "File uploaded successfully." });
    });
  });
}
