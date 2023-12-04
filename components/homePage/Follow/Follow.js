import { FiSearch } from "react-icons/fi";
import styles from "./follow.module.css";
import FollowList from "../Follow-List/FollowList";

const Follow = (props) => {

  const FollowLists = props?.user?.map((user, i) => {
    if (props.profile_id !== user._id) {
      return (
        <FollowList
          profile_id={props.profile_id}
          key={i}
          user={user}
          dispatch={props.dispatch}
          userdispatch={props.userDispatch}
        ></FollowList>
      );
    }
  });

  return (
    <div className={styles.container}>
      <div className={styles.container1}>
        <FiSearch />
        <input className={styles.container2} type="text" placeholder="Search" />
      </div>

      <div className={styles.container3}>
        <h1 className={styles.container4}>Who to Follow</h1>
        {FollowLists}
      </div>
    </div>
  );
};

export default Follow;
