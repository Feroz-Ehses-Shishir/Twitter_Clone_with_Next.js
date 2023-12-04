import styles from "./followList.module.css";
import Image from "next/image";
import { useSession, signOut, getSession } from "next-auth/react";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import {
  followUserActions,
  userActions,
} from "../../../libs/actions/user-actions";

const FollowList = ({ user, dispatch, userdispatch, profile_id }) => {
  const { data: session } = useSession();
  const router = useRouter();
  const [follow, setFollow] = useState(
    user?.followers?.includes(session?.user?.uid)
  );

  const profile = () => {
    router.push({
      pathname: "/profile",
      query: { id: user._id },
    });
  };

  const follow_unfollow = () => {
    dispatch(
      followUserActions.UPDATE,
      {
        id: session?.user?.uid,
        follow: follow,
        user_id: user._id,
        following: user?.following,
        profile_id: profile_id,
      },
      userdispatch
    );
    setFollow((prev) => !prev);
  };

  return (
    <div className={styles.container1}>
      <div className={styles.container5}>
        <img className={styles.container6} alt="Avatar" src={user?.img} />
        <div className={styles.container8}>
          <p onClick={profile} className={styles.container3}>
            {user?.name}
          </p>
          <p className={styles.container4}>@{user?.name}</p>
        </div>
      </div>
      <div className={styles.container2}>
        <div className={styles.container7}>
          {session?.user?.uid !== user?._id && (
            <button onClick={follow_unfollow}>
              {follow ? <span>Unfollow</span> : <span>Follow</span>}
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default FollowList;
