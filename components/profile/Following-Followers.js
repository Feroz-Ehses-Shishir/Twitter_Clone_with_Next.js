import FollowList from "../homePage/FollowList";
import styles from "./following_followers.module.css";

const Following_Followers = (props) => {
  return (
    <div className={styles.main_container}>
      <div className={styles.container}>
        <div className={styles.container_2}>&#x2190; {props?.user?.name}</div>
        <div className={styles.container3}>
          <h1 className={styles.container4}>Following</h1>
          {props?.user?.map((user, i) => (
            <FollowList
              profile_id={props.profile_id}
              key={i}
              user={user}
              dispatch={props.dispatch}
              userdispatch={props.userDispatch}
            ></FollowList>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Following_Followers;
