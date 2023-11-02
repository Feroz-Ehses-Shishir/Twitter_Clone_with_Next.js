import styles from "./post.module.css";
import { useSession, signOut, getSession } from "next-auth/react";
import { BsChat } from "react-icons/bs";
import { FaRetweet } from "react-icons/fa6";
import { AiOutlineHeart, AiOutlineShareAlt, AiFillHeart } from "react-icons/ai";
import { RiDeleteBin5Line } from "react-icons/ri";
import Image from "next/image";
import Input from "./Input";
import { useState } from "react";

const Post = (props) => {
  const { data: session } = useSession();
  let user_name = props?.post?.userId?.name;
  let img = props?.post?.userId?.img;
  let url = props?.post?.image_url;

  if (user_name == undefined) {
    user_name = session?.user?.name;
    img = session?.user?.image;
  }

  const [comment,setComment] = useState(false);

  return (
    <div className={styles.container}>
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
            <div onClick={() => {setComment(prev => !prev)}} className={styles.container6}>
              <BsChat className={styles.container7} />
              {/* comments.length */}
              {1 > 0 && <span className={styles.container8}>{1}</span>}
            </div>

            {session.user.uid !== 1 ? (
              <FaRetweet className={styles.container7} />
            ) : (
              <RiDeleteBin5Line
                className={styles.container8}
                onClick={(e) => {
                  e.stopPropagation();
                  //function call
                }}
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
                  className={`${1 && styles.container12} ${styles.container12}`}
                >
                  1
                </span>
              )}
            </div>

            <AiOutlineShareAlt className={styles.container11} />
          </div>
        </div>
        {comment && (<div></div>)}
      </div>
    </div>
  );
};

export default Post;
