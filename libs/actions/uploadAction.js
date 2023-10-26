import axios from "axios";

const uploadAction = async ({formData}) => {
  let data;
  await axios
    .post(`/api/upload`,formData,{
        headers: {
            'Content-Type': 'multipart/form-data',
        },
    })
    .then((res) => {
      data = "Ok";
    })
    .catch((err) => {
      data = err.response.data;
    });

    return data;
};

export default uploadAction;