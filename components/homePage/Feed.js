import styles from "./feed.module.css";
import Input from "./Input";
import Post from "./Post";
import { useContext, useEffect, useState } from "react";
import { AppContext } from "../../contexts/AppContext";
import { POST_ACTIONS } from "../../libs/actions/post-actions";
import { useActionDispatcher } from "../../hooks/use-action-dispatcher";

const Feed = () => {
  // const [state, dispatch] = useContext(AppContext);
  const [loading, setLoading] = useState(false);

  const [state, dispatch] = useActionDispatcher([{
    userID: {},
    text: "",
    image_url: "",
    type: "",
    parent: "",
}]);
  const [filename,setFileName] = useState();

  return (
    <div className={styles.container}>
      <div className={styles.container_2}>Home</div>
      <Input setLoading={setLoading} dispatch={dispatch} setFileName={setFileName}/>
      {loading==false ? (
        <div className={styles.container_3}>Loading...</div>
      ) : (
        <div>
          {state?.map((post) => (
            <Post key={post?._id} post={post} loading={loading} filename={filename}></Post>
          ))}
        </div>
      )}
    </div>
  );
};

export default Feed;
