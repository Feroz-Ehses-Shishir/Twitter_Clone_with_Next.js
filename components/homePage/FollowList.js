import styles from "./followList.module.css";
import Image from "next/image";
import { useSession, signOut, getSession } from "next-auth/react";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";

const FollowList = ({ user }) => {
  const router = useRouter();
  const [follow,setFollow] = useState(false);

  const profile = () => {
    router.push({
      pathname: '/profile',
      query: { id: user._id },
    });
  }

  const follow_unfollow = () => {
    setFollow((prev) => !prev);
  }

  return (
    <div className={styles.container1}>
      <div className={styles.container5}>
        <img className={styles.container6} alt="Avatar" src={user?.img} />
      </div>
      <div className={styles.container2}>
        <div className={styles.container8}>
          <p onClick={profile} className={styles.container3}>{user?.name}</p>
          <p className={styles.container4}>@{user?.name}</p>
        </div>
        <div className={styles.container7}>
          <button onClick={follow_unfollow}>{follow?(<span>Unfollow</span>):(<span>Follow</span>)}</button>
        </div>
      </div>
    </div>
  );
};

export default FollowList;
