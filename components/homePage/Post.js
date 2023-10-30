import styles from "./post.module.css";
import { useSession, signOut, getSession } from "next-auth/react";
import { BsChat } from "react-icons/bs"; 
import { FaRetweet } from "react-icons/fa";
import { AiOutlineHeart, AiOutlineShareAlt, AiFillHeart } from 'react-icons/ai';
import { RiDeleteBin5Line } from 'react-icons/ri';

const Post = () => {
  const { data: session } = useSession();

  return (
    <div className={styles.container}>
      <div className={styles.container_2}>
        <div>
          <img className={styles.imgg} src={session.user?.image} alt="" />
        </div>

        <div>
          <div className={styles.container3}>
            <p>{session.user?.name}</p>

            <div className={styles.container4}>
              <p>
                {/* <Moment fromNow>{post?.timestamp?.toDate()}</Moment> */}
                .&nbsp;&nbsp;just now
              </p>
            </div>
          </div>
          <p>post text hen ten....</p>
          <img
            className={styles.post_image}
            // src={post?.image}
            alt=""
          />

          <div className={styles.container5}>
            <div className={styles.container6}>
              <BsChat
                className={styles.container7}
                onClick={(e) => {
                  e.stopPropagation();
                  openModal();
                }}
              />
              {/* comments.length */}
              {1 > 0 && (
                <span className={styles.container8}>{1}</span>
              )}
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
              {1 ? (
                <AiFillHeart className={styles.container10}/>
              ) : (
                <AiOutlineHeart className={styles.container11}/>
              )}
              {/* liked length */}
              {1 > 0 && (
                <span className={`${1 && styles.container12} ${styles.container12}`}>
                  1
                </span>
              )}
            </div>

            <AiOutlineShareAlt className={styles.container11} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Post;
