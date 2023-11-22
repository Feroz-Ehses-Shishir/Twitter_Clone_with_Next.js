import styles from "./post.module.css";
import { useSession, signOut, getSession } from "next-auth/react";
import { BsChat } from "react-icons/bs";
import { FaRetweet } from "react-icons/fa6";
import { AiOutlineHeart, AiOutlineShareAlt, AiFillHeart } from "react-icons/ai";
import { RiDeleteBin5Line } from "react-icons/ri";
import { BiCommentEdit } from "react-icons/bi";
import { useEffect, useState } from "react";
import { POST_ACTIONS } from "../../libs/actions/post-actions";
import { useActionDispatcher } from "../../hooks/use-action-dispatcher";
import Edit from "./Edit";
import Input from "./Input";
import Moment from "react-moment";
import { useRouter } from "next/router";

const Post = (props) => {
  const { data: session } = useSession();
  let user_name = props?.post?.userId?.name;
  let img = props?.post?.userId?.img;
  let url = props?.post?.image_url;
  let isUser = props?.post?.userId?._id;
  let type = props?.type;
  let text = props?.post?.text;

  useEffect(() => {
    if (props.post == "finish") {
      props.setIsFinish(true);
    }
  }, []);

  if (user_name == undefined) {
    user_name = props?.user?.name;
    img = props?.user?.img;
    isUser = props?.post?.userId;
  }

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

  const [isLiked, setIsLiked] = useState();

  useEffect(() => {
    setIsLiked(props?.post?.liked?.includes(props?.user?._id));
  }, [props?.post?.liked?.includes(props?.user?._id)]);

  const likePost = async () => {
    setIsLiked((prev) => !prev);
    await props.dispatch(POST_ACTIONS.LIKE, {
      id: props?.post?._id,
      likedId: props?.user?._id,
      type: props?.type,
      isLiked: isLiked,
    });
  };

  const [comment, setComment] = useState(false);
  const [edit, setEdit] = useState(false);

  const renderedItems = props.post?.comments?.map((post) => {
    if (post.type !== "post") {
      return (
        <Post
          user={props?.user}
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

  const reTweet = async () => {
    await props.dispatch(POST_ACTIONS.post, {
      id: props.user?._id,
      reTweetPostId: props?.post?._id,
      input: props?.post?.text,
      filename: props?.post?.image_url,
      type: "reTweet",
      parent: props.parentId,
      user_img: props?.post?.userId?.img,
      user_name: props?.post?.userId?.name,
      repost_user_name: props?.user?.name,
      main_user_id: props?.post?.userId?._id,
    });
  };

  if (props?.post?.type == "reTweet") {
    img = props?.post?.reTweetPostId?.userId?.img;
    user_name = props?.post?.reTweetPostId?.userId?.name;
    text = props?.post?.reTweetPostId?.text;
    url = props?.post?.reTweetPostId?.image_url;
  }

  const router = useRouter();
  const profile = () => {
    if (props?.post?.type == "reTweet") {
      router.push({
        pathname: "/profile",
        query: { id: props?.post?.reTweetPostId?.userId?._id },
      });
    } else {
      router.push({
        pathname: "/profile",
        query: { id: props?.post?.userId?._id },
      });
    }
  };

  return (
    <>
      {props?.post == "finish" ? (
        <></>
      ) : (
        <div key={props?.post?._id} className={styles.container}>
          {props?.post?.type == "reTweet" && (
            <div className={styles.reTweet}>
              <FaRetweet />
              {props?.post?.userId?._id == session?.user?.uid ? (
                <div>You reposted</div>
              ) : (
                <div>{props?.post?.userId?.name} reposted</div>
              )}
            </div>
          )}
          <div className={styles.container_2}>
            <div>
              <img className={styles.imgg} src={img} alt="" />
            </div>

            <div>
              <div className={styles.container3}>
                <p onClick={profile} className={styles.container14}>
                  {user_name}
                </p>

                <div className={styles.container4}>
                  <p>
                    -&nbsp;&nbsp;
                    <Moment fromNow>{props?.post?.createdAt}</Moment>
                  </p>
                </div>
              </div>
              <p>{text}</p>
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
                    <BsChat className={styles.container6} />
                    {props.totalComments > 0 && (
                      <span className={styles.container8}>
                        {props.totalComments}
                      </span>
                    )}
                  </div>
                )}

                {props.user?._id !== isUser ? (
                  <FaRetweet onClick={reTweet} className={styles.container7} />
                ) : (
                  <RiDeleteBin5Line
                    className={styles.container84}
                    onClick={deletePost}
                  />
                )}

                <div className={styles.container9} onClick={likePost}>
                  {isLiked ? (
                    <AiFillHeart className={styles.container10} />
                  ) : (
                    <AiOutlineHeart className={styles.container11} />
                  )}
                  {props?.post?.liked?.length > 0 && (
                    <span
                      className={`${isLiked && styles.container16} ${
                        styles.container8
                      }`}
                    >
                      {props?.post?.liked?.length}
                    </span>
                  )}
                </div>

                <AiOutlineShareAlt className={styles.container11} />

                {props.user?._id == isUser &&
                props?.post?.type !== "reTweet" ? (
                  <div
                    className={styles.container85}
                    onClick={() => {
                      setEdit((prev) => !prev);
                      setComment(false);
                    }}
                  >
                    <BiCommentEdit />
                  </div>
                ) : (
                  <></>
                )}
              </div>
            </div>
            <div></div>
            {comment && (
              <div>
                <Input
                  user={props?.user}
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
                  user={props.user}
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
      )}
    </>
  );
};

export default Post;
