import { useSession, signIn, signOut, getSession } from "next-auth/react";
import styles from "../styles/homePage.module.css";
import SideBar from "../components/homePage/Side-Bar";
import Feed from "../components/homePage/Feed";

const profile = () => {
    return (
        <div className={styles.container}>
          <SideBar></SideBar>
          <div className={styles.feed_container}>
            
          </div>
        </div>
      );
}

export default profile;