import styles from "./profile.module.css";
import { BiCalendar } from "react-icons/bi";
import { useSession, signOut, getSession } from "next-auth/react";
import Modal from "../modal/Modal";
import { useEffect, useState } from "react";
import Edit from "./Edit";
import { useActionDispatcher } from "../../hooks/use-action-dispatcher";
import { userActions } from "../../libs/actions/user-actions";
import moment from "moment";
import Link from "next/link";
import Post from "../homePage/Post";
import { POST_ACTIONS } from "../../libs/actions/post-actions";
import { useRouter } from "next/router";

const Profile = (props) => {
  const { data: session } = useSession();
  const [isOpenEdit, setIsOpenEdit] = useState(false);
  const [postState, postDispatch] = useActionDispatcher();
  const router = useRouter();

  useEffect(() => {
    postDispatch(POST_ACTIONS.get);
  }, []);

  const renderedItems = postState?.map((post) => {
    let totalcomments = post?.comments?.length;
    for (let i = 0; i < post?.comments?.length; i++) {
      totalcomments += post?.comments[i]?.comments?.length;
    }

    if (props?.user?.posts?.includes(post?._id)) {
      return (
        <Post
          user={props?.user}
          type="post"
          key={post?._id}
          post={post}
          dispatch={postDispatch}
          totalComments={totalcomments}
        ></Post>
      );
    }
  });

  const follow_unfollow = () => {
    props.dispatch(userActions.UPDATE, {
      id: session?.user?.uid,
      follow: props?.user?.followers?.includes(session?.user?.uid),
      user_id: props?.user._id,
      following: props?.user?.following,
      profile_id: session?.user?.uid,
    });
  };

  const [show,setShow] = useState("Profile")

  const following = () => {
    router.push({
      pathname: "/followList",
      query: { id: props?.user._id },
    });
  };

  const followers = () => {
    router.push({
      pathname: "/followers",
      query: { id: props?.user._id },
    });
  };

  return (
    <div className={styles.container}>
      <Link href="/home">
        <div className={styles.container_2}>&#x2190; {props?.user?.name}</div>
      </Link>
      <div>
        <div className={styles.container1}>
          <img src={props?.user?.cover} className={styles.container2} />
          <div className={styles.container3}>
            <div className={styles.container5}>
              <img className={styles.container6} src={props?.user?.img} />
            </div>
          </div>
        </div>
      </div>

      <div className={styles.container7}>
        <div className={styles.container8}>
          {session?.user?.uid == props?.user?._id ? (
            <div>
              <button
                className={styles.btn}
                onClick={() => setIsOpenEdit(true)}
              >
                Edit Profile
              </button>
              <Modal
                isOpen={isOpenEdit}
                closeModal={() => setIsOpenEdit(false)}
              >
                <Edit
                  dispatch={props.dispatch}
                  state={props?.user}
                  setIsOpenEdit={setIsOpenEdit}
                ></Edit>
              </Modal>
            </div>
          ) : (
            <div>
              <button onClick={follow_unfollow} className={styles.btn}>
                {props?.user?.followers?.includes(session?.user?.uid) ? (
                  <span>Unfollow</span>
                ) : (
                  <span>Follow</span>
                )}
              </button>
            </div>
          )}
        </div>
        <div className={styles.container9}>
          <div className={styles.container10}>
            <div className={styles.container11}>{props?.user?.name}</div>
            <div className={styles.container12}>@{props?.user?.name}</div>
          </div>
          <div className={styles.container13}>
            <div>{props?.user?.bio}</div>
            <div className={styles.container14}>
              <BiCalendar />
              <div>
                Joined {moment(props?.user?.createdAt).format("Do MMMM, YYYY")}
              </div>
            </div>
          </div>
          <div className={styles.container15}>
            <div onClick={following} className={styles.container16}>
              <div>{props?.user?.following?.length}</div>
              <div className={styles.container17}>Following</div>
            </div>
            <div onClick={followers} className={styles.container16}>
              <div>{props?.user?.followers?.length}</div>
              <div className={styles.container17}>Followers</div>
            </div>
          </div>
        </div>
      </div>
      {renderedItems}
    </div>
  );
};

export default Profile;
