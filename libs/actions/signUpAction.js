import axios from "axios";

const signUpAction = async (name, email, password, confirmPassword) => {
  let data;
  await axios
    .post(`/api/users`, { name, email, password, confirmPassword })
    .then((res) => {
      data = "Ok";
    })
    .catch((err) => {
      data = err.response.data;
    });

    return data;
};

export default signUpAction;
