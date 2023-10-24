import styles from "./sideBar.module.css";
import { FaXTwitter } from "react-icons/fa6";

const SideBar = () => {
  
    return (
      <div className={styles.container}>
        <div className={styles.logo}>
        <FaXTwitter className={styles.logo2} />
        </div>
        <div className={styles.links_container}>

        </div>
      </div>
    );
};

export default SideBar;
  