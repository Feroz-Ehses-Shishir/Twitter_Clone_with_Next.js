import styles from "./feed.module.css";
import Input from "../Input/Input";
import Post from "../Post/Post";
import { useContext, useEffect, useState } from "react";
import { AppContext } from "../../../contexts/AppContext";
import { POST_ACTIONS } from "../../../libs/actions/post-actions";
import { useActionDispatcher } from "../../../hooks/use-action-dispatcher";
import { userActions } from "../../../libs/actions/user-actions";
import { useSession } from "next-auth/react";

const Feed = () => {
  const [loading, setLoading] = useState(false);
  const { data: session } = useSession();

  const [state, dispatch] = useActionDispatcher();
  const [userState, userDispatch] = useActionDispatcher();

  const [isFinish, setIsFinish] = useState(false);
  const [page, setPage] = useState(0);

  useEffect(() => {
    userDispatch(userActions.GET_BY_ID, { id: session?.user?.uid });
  }, []);

  const renderedItems = state?.map((post, j) => {
    let totalcomments = post?.comments?.length;
    for (let i = 0; i < post?.comments?.length; i++) {
      totalcomments += post?.comments[i].comments.length;
    }
    
    if(post!==undefined){
      return (
        <Post
          user={userState}
          type="post"
          setLoading={setLoading}
          key={j}
          post={post}
          dispatch={dispatch}
          loading={loading}
          totalComments={totalcomments}
          setIsFinish={setIsFinish}
        ></Post>
      );
    }
  });

  const pageHandle = () => {
    setPage((prev) => prev + 1);
  };

  return (
    <div className={styles.container}>
      <div className={styles.container_2}>Home</div>
      <Input
        user={userState}
        parentId="none"
        type="post"
        setLoading={setLoading}
        dispatch={dispatch}
        page={page}
        state={state}
      />
      {loading == false && state == undefined ? (
        <div className={styles.container_3}>Loading...</div>
      ) : (
        <>
          <div>{renderedItems}</div>
          {isFinish ? (
            <div className={styles.btn}>no more posts</div>
          ) : (
            <div className={styles.btn} onClick={pageHandle}>
              show more
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default Feed;
