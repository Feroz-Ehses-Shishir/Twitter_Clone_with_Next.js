import styles from "./followList.module.css";
import Image from "next/image";
import { useSession, signOut, getSession } from "next-auth/react";

const FollowList = () => {
  const { data: session } = useSession();

  return (
    <div className={styles.container1}>
      <div className={styles.container5}>
      <img
        className={styles.container6}
        alt="Avatar"
        src={session?.user?.image}
      />
    </div>
      <div className={styles.container2}>
        <p className={styles.container3}>name</p>
        <p className={styles.container4}>@user_name</p>
      </div>
      <div className={styles.container7}><button>Follow</button></div>
    </div>
  );
};

export default FollowList;
