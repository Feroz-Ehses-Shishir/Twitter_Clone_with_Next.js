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

  if (type == "post") {
    type = "comment";
  } else if (type == "comment") {
    type = "reply";
  }

  const deletePost = async () => {
    await props.dispatch(POST_ACTIONS.DELETE, { id: props?.post?._id });
  };

  const [comment, setComment] = useState(false);
  const [edit, setEdit] = useState(false);
  
  // console.log(`type ${type} -- ${props.post?.comments}`);

  const renderedItems = props.post?.comments?.map((post) => {
    if (post.type !== "post") {
      return (
        <Post
          type={type}
          post={post}
          setLoading={props.setLoading}
          key={post?._id}
          dispatch={props.dispatch}
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
              <p>
                {/* <Moment fromNow>{post?.timestamp?.toDate()}</Moment> */}
                .&nbsp;&nbsp;just now
              </p>
            </div>
          </div>
          <p>{props?.post?.text}</p>
          <img className={styles.post_image} src={url} alt="" />

          <div className={styles.container5}>
            <div
              onClick={() => {
                setComment((prev) => !prev);
                setEdit(false);
              }}
              className={styles.container6}
            >
              <BsChat className={styles.container7} />
              {/* comments.length */}
              {1 > 0 && <span className={styles.container8}>{1}</span>}
            </div>

            {session.user?.uid !== isUser ? (
              <FaRetweet className={styles.container7} />
            ) : (
              <RiDeleteBin5Line
                className={styles.container84}
                onClick={deletePost}
              />
            )}

            {/* like post */}
            <div
              className={styles.container9}
              onClick={(e) => {
                e.stopPropagation();
              }}
            >
              {/* liked */}
              {false ? (
                <AiFillHeart className={styles.container10} />
              ) : (
                <AiOutlineHeart className={styles.container11} />
              )}
              {/* liked length */}
              {1 > 0 && (
                <span
                  className={`${1 && styles.container8} ${styles.container8}`}
                >
                  1
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

            <div>
              {renderedItems}
            </div>
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
