import styles from "./post.module.css";
import { useSession, signOut, getSession } from "next-auth/react";
import { BsChat } from "react-icons/bs";
import { FaRetweet } from "react-icons/fa6";
import { AiOutlineHeart, AiOutlineShareAlt, AiFillHeart } from "react-icons/ai";
import { RiDeleteBin5Line } from "react-icons/ri";
import { BiCommentEdit } from "react-icons/bi";
import { useState } from "react";
import { POST_ACTIONS } from "../../libs/actions/post-actions";
import { useActionDispatcher } from "../../hooks/use-action-dispatcher";
import Edit from "./Edit";
import Input from "./Input";
import Moment from 'react-moment';


const Post = (props) => {
  const { data: session } = useSession();
  let user_name = props?.post?.userId?.name;
  let img = props?.post?.userId?.img;
  let url = props?.post?.image_url;
  let isUser = props?.post?.userId?._id;
  let type = props?.type;

  if (user_name == undefined) {
    user_name = session?.user?.name;
    img = session?.user?.image;
    isUser = props?.post?.userId;
  }

  function extractAlphaSubstring(inputString) {
    const match = inputString.match(/^[a-zA-Z]+/);
    return match ? match[0] : '';
  }

  const shortName = extractAlphaSubstring(user_name);

  if (type == "post") {
    type = "comment";
  } else if (type == "comment") {
    type = "reply";
  }

  const deletePost = async () => {
    await props.dispatch(POST_ACTIONS.DELETE, {
      id: props?.post?._id,
      type: props?.type,
    });
  };

  const [isLiked,setIsLiked] = useState(props?.post?.liked.includes(session?.user?.uid));

  const likePost = async () => {
    setIsLiked((prev) => !prev);
    await props.dispatch(POST_ACTIONS.LIKE, {
      id: props?.post?._id,
      likedId: session?.user?.uid,
      type: props?.type,
      isLiked: isLiked
    });  
  };

  const [comment, setComment] = useState(false);
  const [edit, setEdit] = useState(false);

  const renderedItems = props.post?.comments?.map((post) => {
    if (post.type !== "post") {
      return (
        <Post
          type={type}
          post={post}
          setLoading={props.setLoading}
          key={post?._id}
          dispatch={props.dispatch}
          totalComments={post?.comments?.length}
        ></Post>
      );
    }
  });

  return (
    <div key={props?.post?._id} className={styles.container}>
      <div className={styles.container_2}>
        <div>
          <img className={styles.imgg} src={img} alt="" />
        </div>

        <div>
          <div className={styles.container3}>
            <p className={styles.container14}>{user_name}</p>

            <div className={styles.container4}>
              <p>@{shortName}&nbsp;&nbsp;-&nbsp;&nbsp;
                <Moment fromNow>{props?.post?.createdAt}</Moment>
                {/* {props?.post?.createdAt.toDate()} */}
              </p>
            </div>
          </div>
          <p>{props?.post?.text}</p>
          <img className={styles.post_image} src={url} alt="" />

          <div className={styles.container5}>
            {props.type !== "reply" && (
              <div
                onClick={() => {
                  setComment((prev) => !prev);
                  setEdit(false);
                }}
                className={styles.container6}
              >
                <BsChat className={styles.container7} />
                {props.totalComments > 0 && (
                  <span className={styles.container8}>
                    {props.totalComments}
                  </span>
                )}
              </div>
            )}

            {session.user?.uid !== isUser ? (
              <FaRetweet className={styles.container7} />
            ) : (
              <RiDeleteBin5Line
                className={styles.container84}
                onClick={deletePost}
              />
            )}

            <div
              className={styles.container9}
              onClick={likePost}
            >
              {isLiked ? (
                <AiFillHeart className={styles.container10} />
              ) : (
                <AiOutlineHeart className={styles.container11} />
              )}
              {props?.post?.liked.length > 0 && (
                <span
                  className={`${isLiked && styles.container16} ${styles.container8}`}
                >
                  {props?.post?.liked.length}
                </span>
              )}
            </div>

            <AiOutlineShareAlt className={styles.container11} />

            {session.user?.uid == isUser && (
              <div
                className={styles.container85}
                onClick={() => {
                  setEdit((prev) => !prev);
                  setComment(false);
                }}
              >
                <BiCommentEdit />
              </div>
            )}
          </div>
        </div>
        <div></div>
        {comment && (
          <div>
            <Input
              type={type}
              parentId={props?.post?._id}
              setLoading={props.setLoading}
              dispatch={props.dispatch}
            />

            <div>{renderedItems}</div>
          </div>
        )}

        <div>
          {edit && (
            <Edit
              setEdit={setEdit}
              id={props?.post?._id}
              text={props?.post?.text}
              selectedFile={props?.post?.image_url}
              dispatch={props.dispatch}
              type={props.type}
            ></Edit>
          )}
        </div>
      </div>
    </div>
  );
};

export default Post;
