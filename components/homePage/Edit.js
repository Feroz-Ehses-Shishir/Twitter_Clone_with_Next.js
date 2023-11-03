import { useContext, useEffect, useState } from "react";
import styles from "./edit.module.css";
import { AiOutlineClose } from "react-icons/ai";
import { BsImage } from "react-icons/bs";
import uploadAction from "../../libs/actions/uploadAction";
import { POST_ACTIONS } from "../../libs/actions/post-actions";
import { useSession, signOut, getSession } from "next-auth/react";

const Edit = (props) => {

    const { data: session } = useSession();
    const [input, setInput] = useState("");
    const [image, setImage] = useState(null);
    const [selectedf, setSelectedFile] = useState(null);
  
    // const [,dispatch] = useContext(AppContext);
  
    // useEffect(() => {
    //   props.dispatch(POST_ACTIONS.get);
    //   props.setLoading(true);
    // }, []);
  
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
  
    //   await props.dispatch(POST_ACTIONS.post,{input,filename:filename.data});
  
      setInput("");
      setSelectedFile(null);
    };

    return (
        <div className={styles.container}>
          <div className={styles.container2}>
            <div>
              <img className={styles.img} src={session?.user?.image} alt="" />
            </div>
            <div className={styles.container3}>
              <textarea
                className={styles.container4}
                rows="3"
                placeholder="Want to add text!"
                value={input}
                onChange={(e) => setInput(e.target.value)}
              />
    
              {selectedf && (
                <div className={styles.img_container}>
                  <div
                    className={styles.img1}
                    onClick={() => setSelectedFile(null)}
                  >
                    <AiOutlineClose className={styles.cross} />
                  </div>
    
                  <img src={selectedf} alt="" className={styles.img2} />
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
                  Save
                </button>
              </div>
            </div>
          </div>
        </div>
      );
}

export default Edit;