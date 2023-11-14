import { useContext, useEffect, useState } from "react";
import styles from "./edit.module.css";
import { AiOutlineClose } from "react-icons/ai";
import { BsImage } from "react-icons/bs";
import uploadAction from "../../libs/actions/uploadAction";
import { POST_ACTIONS } from "../../libs/actions/post-actions";
import { useSession, signOut, getSession } from "next-auth/react";

const Edit = (props) => {

    const { data: session } = useSession();
    const [input, setInput] = useState(props.text);
    const [image, setImage] = useState(null);
    const [selectedf, setSelectedF] = useState(props.selectedFile);
  
    const addImage = (e) => {

      setImage(e.target.files[0]);
      const reader = new FileReader();
      if (e.target.files[0]) {
        reader.readAsDataURL(e.target.files[0]);
      }
      reader.onload = (readerEvent) => {
        setSelectedF(readerEvent.target.result);
      };
    };
  
    const sendPost = async () => {
      let filename="/";
      if (image) {
        filename = await uploadAction(image);
        filename = filename.data;
      }
      else{
        filename = selectedf;
      }
  
      await props.dispatch(POST_ACTIONS.UPDATE,{id:props.id,input,filename,type:props.type});
      setInput("");
      setSelectedF(null);
      props.setEdit(false);
    };

    return (
        <div className={styles.container}>
          <div className={styles.container2}>
            <div>
              <img className={styles.img} src={props?.user?.img} alt="" />
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
                <div className={styles.img__container}>
                  <div
                    className={styles.img1}
                    onClick={() => setSelectedF(null)}
                  >
                    <AiOutlineClose className={styles.cross} />
                  </div>
    
                  <img src={selectedf} alt="" className={styles.img2} />
                </div>
              )}
              <div className={styles.input_container}>
                <div className={styles.input_container2}>
                  <label htmlFor="file2">
                    <BsImage className={styles.cursor}/>
                  </label>
                  <input id="file2" type="file" hidden onChange={addImage}/>
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