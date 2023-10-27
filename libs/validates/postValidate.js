const postValidate = (req) => {
    const { text, img } = req.body;
    if (text=="" && img=="") {
      return "Not Ok";
    } 
  };
  
  export default postValidate;