import styles from "./profile.module.css";
import { BiCalendar } from "react-icons/bi";
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

      <div className={styles.container7}>
      <div className={styles.container8}>
        {1 === 1 ? (
          <button>Edit</button>
        ) : (
          <button>Follow</button>
        )}
      </div>
      <div className={styles.container9}>
        <div className={styles.container10}>
          <div className={styles.container11}>
            {session?.user?.name}
          </div>
          <div className={styles.container12}>
            @{session?.user?.name}
          </div>
        </div>
        <div className={styles.container13}>
          <div>
            bio
          </div>
          <div 
            className={styles.container14}>
            <BiCalendar size={24} />
            <div>
              Joined 
            </div>
          </div>
        </div>
        <div className={styles.container15}>
          <div className={styles.container16}>
            <div>{ 0 }</div>
            <div className={styles.container17}>Following</div>
          </div>
          <div className={styles.container16}>
            <div>{ 0 }</div>
            <div className={styles.container17}>Followers</div>
          </div>
        </div>
      </div>
    </div>
    </div>
  );
};

export default Profile;
