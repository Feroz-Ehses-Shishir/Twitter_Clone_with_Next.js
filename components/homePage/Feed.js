import styles from "./feed.module.css";
import Input from "./Input";
import Post from "./Post";
import { useContext, useEffect, useState } from "react";
import { AppContext } from "../../contexts/AppContext";
import { POST_ACTIONS } from "../../libs/actions/post-actions";
import { useActionDispatcher } from "../../hooks/use-action-dispatcher";
import { userActions } from "../../libs/actions/user-actions";
import { useSession } from "next-auth/react";

const Feed = () => {
  
  const [loading, setLoading] = useState(false);
  const { data: session } = useSession();

  const [state, dispatch] = useActionDispatcher([{}]);
  const [userState, userDispatch] = useContext(AppContext);
  
  useEffect(() => {
    userDispatch(userActions.GET_BY_ID,{id:session?.user?.uid});
  }, []);

  const renderedItems = state?.map((post) => {
    let totalcomments = post?.comments?.length;
    for (let i = 0; i < post?.comments?.length; i++) {
      totalcomments+= post?.comments[i].comments.length;
    }

      return (
        <Post
          user={userState}
          type="post"
          setLoading={setLoading}
          key={post?._id}
          post={post}
          dispatch={dispatch}
          loading={loading}
          totalComments={totalcomments}
        ></Post>
      );
  });

  return (
    <div className={styles.container}>
      <div className={styles.container_2}>Home</div>
      <Input
        user={userState}
        parentId="none"
        type="post"
        setLoading={setLoading}
        dispatch={dispatch}
      />
      {loading == false ? (
        <div className={styles.container_3}>Loading...</div>
      ) : (
        <div>{renderedItems}</div>
      )}
    </div>
  );
};

export default Feed;
