import axios from "axios";

const uploadAction = async (image) => {

  const formData = new FormData();
  formData.append("file", image);

  try {
    const response = await axios.post("/api/upload", formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
    return response;
  } catch (error) {
    console.error("File upload error:", error);
  }
};

export default uploadAction;