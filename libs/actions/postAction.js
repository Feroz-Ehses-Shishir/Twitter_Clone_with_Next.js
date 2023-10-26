import axios from "axios";

const postAction = async (userId, text, img, type, parentId) => {
  let data;
  await axios
    .post(`/api/posts`, { userId, text, img, type, parentId })
    .then((res) => {
      data = "Ok";
    })
    .catch((err) => {
      data = err.response.data;
    });

    return data;
};

export default postAction;