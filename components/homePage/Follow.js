import { FiSearch } from "react-icons/fi";
import styles from "./follow.module.css";
import FollowList from "./FollowList";

const Follow = (props) => {
 
  return (
    <div className={styles.container}>
      <div className={styles.container1}>
        <FiSearch />
        <input className={styles.container2} type="text" placeholder="Search" />
      </div>

      <div className={styles.container3}>
        <h1 className={styles.container4}>Who to Follow</h1>
        {props?.user?.map((user,i) => (
          <FollowList key={i} user={user} dispatch={props.dispatch}></FollowList>
        ))}
      </div>
    </div>
  );
};

export default Follow;
