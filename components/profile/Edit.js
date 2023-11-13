import { useState } from "react";
import styles from "./edit.module.css";
import { userActions } from "../../libs/actions/user-actions";
import uploadAction from "../../libs/actions/uploadAction";

const Edit = (props) => {

  const [name,setName] = useState(props?.state?.name);
  const [bio,setBio] = useState(props?.state?.bio);
  const [image, setImage] = useState(null);
  const [cover, setCover] = useState(null);
  
    const addImage = (e) => {
      setImage(e.target.files[0]);
    };

    const addCover = (e) => {
      setCover(e.target.files[0]);
    };
  
    const updateProfile = async (e) => {
      e.preventDefault();

      let filename1=props.state.img;
      if (image) {
        filename1 = await uploadAction(image);
        filename1 = filename1.data;
      }

      let filename2=props.state.cover;
      if (cover) {
        filename2 = await uploadAction(cover);
        filename2 = filename2.data;
      }
  
      await props.dispatch(userActions.UPDATE,{id:props?.state?._id,name:name,img:filename1,cover:filename2,bio:bio});

      props.setIsOpenEdit(false);
    };

  return (
    <div className={styles.container}>
      <form onSubmit={updateProfile}>
        <div>Update Your Profile</div>
        <div>
          <input
            placeholder="Name"
            type="text"
            value={name}
            onChange={(e) => {
              setName(e.target.value)
            }}
          />
        </div>
        <div>
          <textarea
            placeholder="Bio"
            type="text"
            value={bio}
            onChange={(e) => {
              setBio(e.target.value)
            }}
          />
        </div>
        <div className={styles.containerF}>
        <label>Profile Photo :</label>
        <input id="file3" type="file" onChange={addImage}/>
        </div>
        <div className={styles.containerF}>
        <label>Cover Photo :</label>
        <input id="file4" type="file"  onChange={addCover}/>
        </div>
        <button type="submit">Save</button>
      </form>
    </div>
  );
};

export default Edit;
