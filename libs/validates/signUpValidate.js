const signUpValidate = (req) => {
  const { name, email, password, confirmPassword } = req.body;
  if (name == "" || email == "" || password == "" || confirmPassword == "") {
    return "All Input is Required";
  } else if (password != confirmPassword) {
    return "Password doesn't match";
  } else {
    return "OK";
  }
};

export default signUpValidate;
