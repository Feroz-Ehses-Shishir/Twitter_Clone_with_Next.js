import styles from "./feed.module.css";
import Input from "./Input";
import Post from "./Post";
import { useContext, useEffect } from "react";
import { AppContext } from "../../contexts/AppContext";
import { POST_ACTIONS } from "../../libs/actions/post-actions";

const Feed = () => {

  const [state,dispatch] = useContext(AppContext);

  useEffect(() => {
    dispatch(POST_ACTIONS.get);
  },[]);

  return (
    <div className={styles.container}>
      <div className={styles.container_2}>
        Home
      </div>
      <Input/>
      {state?.map((post) => (
        <Post key={post._id} post={post} ></Post>
      ))}
    </div>
  );
};

export default Feed;
