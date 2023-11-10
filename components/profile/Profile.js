import styles from "./profile.module.css";
import { useSession, signOut, getSession } from "next-auth/react";

const Profile = () => {
  const { data: session } = useSession();

  return (
    <div className={styles.container}>
      <div className={styles.container_2}>&#x2190; Profile</div>
      <div>
        <div className={styles.container1}>
          <img
            src={session?.user?.image}
            fill
            alt="Cover Image"
            className={styles.container2}
          />
          <div className={styles.container3}>
            <div className={styles.container5}>
              <img
                className={styles.container6}
                alt="Avatar"
                src={session?.user?.image}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
