import { useContext, useEffect, useState } from "react";
import styles from "./input.module.css";
import { useSession, signOut, getSession } from "next-auth/react";
import { AiOutlineClose } from "react-icons/ai";
import { BsImage } from "react-icons/bs";
import uploadAction from "../../libs/actions/uploadAction";
import { POST_ACTIONS } from "../../libs/actions/post-actions";
import { AppContext } from "../../contexts/AppContext";

const Input = () => {
  const { data: session } = useSession();
  const [input, setInput] = useState("");
  const [image, setImage] = useState(null);
  const [selectedFile, setSelectedFile] = useState(null);

  const [,dispatch] = useContext(AppContext);

  const addImageToPost = (e) => {
    setImage(e.target.files[0]);
    const reader = new FileReader();
    if (e.target.files[0]) {
      reader.readAsDataURL(e.target.files[0]);
    }
    reader.onload = (readerEvent) => {
      setSelectedFile(readerEvent.target.result);
    };
  };

  const sendPost = async () => {
    let filename="/";
    if (image) {
      filename = await uploadAction(image);
    }

    await dispatch(POST_ACTIONS.post,{id:session.user?.uid,input,filename:filename.data,type:"post",parent:"none"});

    setInput("");
    setSelectedFile(null);
  };

  return (
    <div className={styles.container}>
      <div className={styles.container_2}>
        <div>
          <img className={styles.img} src={session?.user?.image} alt="" />
        </div>
        <div className={styles.container_3}>
          <textarea
            className={styles.container_4}
            rows="3"
            placeholder="What's Happening?"
            value={input}
            onChange={(e) => setInput(e.target.value)}
          />

          {selectedFile && (
            <div className={styles.img_container}>
              <div
                className={styles.img1}
                onClick={() => setSelectedFile(null)}
              >
                <AiOutlineClose className={styles.cross} />
              </div>

              <img src={selectedFile} alt="" className={styles.img2} />
            </div>
          )}
          <div className={styles.input_container}>
            <div className={styles.input_container2}>
              <label htmlFor="file">
                <BsImage className={styles.cursor} />
              </label>
              <input id="file" type="file" hidden onChange={addImageToPost} />
            </div>

            <button className={styles.input_button} onClick={sendPost}>
              Tweet
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Input;
