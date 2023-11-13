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

const Profile = (props) => {
  const { data: session } = useSession();
  const [isOpenEdit, setIsOpenEdit] = useState(false);

  const [state, dispatch] = useActionDispatcher({});

  useEffect(() => {
    dispatch(userActions.GET_BY_ID,{id:props.id});
  }, []);
  console.log(state?.posts);
  const renderedItems = state?.posts?.map((post) => {
    let totalcomments = post?.comments?.length;
    for (let i = 0; i < post?.comments?.length; i++) {
      totalcomments+= post?.comments[i].comments.length;
    }

    if (post.type == "post") {
      return (
        <Post
          type="post"
          key={post?._id}
          post={post}
          dispatch={dispatch}
          totalComments={totalcomments}
        ></Post>
      );
    }
  });

  return (
    <div className={styles.container}>
      <Link href="/home"><div className={styles.container_2}>&#x2190; {state?.name}</div></Link>
      <div>
        <div className={styles.container1}>
          <img
            src={state?.cover}
            className={styles.container2}
          />
          <div className={styles.container3}>
            <div className={styles.container5}>
              <img
                className={styles.container6}
                src={state?.img}
              />
            </div>
          </div>
        </div>
      </div>

      <div className={styles.container7}>
        <div className={styles.container8}>
          {session?.user?.uid==state?._id ? (
            <div>
              <button className={styles.btn} onClick={() => setIsOpenEdit(true)}>Edit Profile</button>
              <Modal
                isOpen={isOpenEdit}
                closeModal={() => setIsOpenEdit(false)}
              >
                <Edit dispatch={dispatch} state={state} setIsOpenEdit={setIsOpenEdit}></Edit>
              </Modal>
            </div>
          ) : (
            <button>Follow</button>
          )}
        </div>
        <div className={styles.container9}>
          <div className={styles.container10}>
            <div className={styles.container11}>{state?.name}</div>
            <div className={styles.container12}>@{state?.name}</div>
          </div>
          <div className={styles.container13}>
            <div>{state?.bio}</div>
            <div className={styles.container14}>
              <BiCalendar/>
              <div>Joined {moment(state?.createdAt).format("Do MMMM, YYYY")}</div>
            </div>
          </div>
          <div className={styles.container15}>
            <div className={styles.container16}>
              <div>{state?.following?.length}</div>
              <div className={styles.container17}>Following</div>
            </div>
            <div className={styles.container16}>
              <div>{state?.followers?.length}</div>
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
