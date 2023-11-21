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

const Profile = ({ user, dispatch, isFollow, profile_id, page, setPage }) => {
  const { data: session } = useSession();
  const [isOpenEdit, setIsOpenEdit] = useState(false);
  const [postState, postDispatch] = useActionDispatcher();
  const router = useRouter();

  useEffect(() => {
    postDispatch(POST_ACTIONS.GET_BY_PROFILE, { id: profile_id,page:page });
  }, [profile_id,page]);

  const renderedItems = postState?.map((post) => {
    let totalcomments = post?.comments?.length;
    for (let i = 0; i < post?.comments?.length; i++) {
      totalcomments += post?.comments[i]?.comments?.length;
    }
    return (
      <Post
        user={user}
        type="post"
        key={post?._id}
        post={post}
        dispatch={postDispatch}
        totalComments={totalcomments}
      ></Post>
    );
  });

  const follow_unfollow = () => {
    dispatch(userActions.UPDATE, {
      id: session?.user?.uid,
      follow: isFollow,
      user_id: user._id,
      following: user?.following,
      profile_id: profile_id,
    });
  };

  const following = () => {
    router.push({
      pathname: "followList",
      query: { id: user._id, type: "Following" },
    });
  };

  const followers = () => {
    router.push({
      pathname: "followList",
      query: { id: user._id, type: "Followers" },
    });
  };

  const pageHandle = () => {
    setPage((prev) => prev+1);
  }

  return (
    <div className={styles.container}>
      <Link href="/home">
        <div className={styles.container_2}>&#x2190; {user?.name}</div>
      </Link>
      <div>
        <div className={styles.container1}>
          <img src={user?.cover} className={styles.container2} />
          <div className={styles.container3}>
            <div className={styles.container5}>
              <img className={styles.container6} src={user?.img} />
            </div>
          </div>
        </div>
      </div>

      <div className={styles.container7}>
        <div className={styles.container8}>
          {session?.user?.uid == user?._id ? (
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
                  dispatch={dispatch}
                  state={user}
                  setIsOpenEdit={setIsOpenEdit}
                ></Edit>
              </Modal>
            </div>
          ) : (
            <div>
              <button onClick={follow_unfollow} className={styles.btn}>
                {isFollow ? <span>Unfollow</span> : <span>Follow</span>}
              </button>
            </div>
          )}
        </div>
        <div className={styles.container9}>
          <div className={styles.container10}>
            <div className={styles.container11}>{user?.name}</div>
            <div className={styles.container12}>@{user?.name}</div>
          </div>
          <div className={styles.container13}>
            <div>{user?.bio}</div>
            <div className={styles.container14}>
              <BiCalendar />
              <div>
                Joined {moment(user?.createdAt).format("Do MMMM, YYYY")}
              </div>
            </div>
          </div>
          <div className={styles.container15}>
            <div onClick={following} className={styles.container16}>
              <div>{user?.following?.length}</div>
              <div className={styles.container17}>Following</div>
            </div>
            <div onClick={followers} className={styles.container16}>
              <div>{user?.followers?.length}</div>
              <div className={styles.container17}>Followers</div>
            </div>
          </div>
        </div>
      </div>
      {renderedItems}
      <div className={styles.btn1} onClick={pageHandle}>show more</div>
    </div>
    
  );
};

export default Profile;
