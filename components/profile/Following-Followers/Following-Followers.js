import { useRouter } from "next/router";
import FollowList from "../../homePage/Follow-List/FollowList";
import styles from "./following_followers.module.css";

const Following_Followers = (props) => {

  const router = useRouter();

  const profile = () => {
    router.push({
      pathname: "/profile",
      query: { id: props?.current_user?._id },
    });
  };

  return (
    <div className={styles.main_container}>
      <div className={styles.container}>
        <div onClick={profile} className={styles.container_2}>&#x2190; {props?.current_user?.name}</div>
        <div className={styles.container3}>
          <h1 className={styles.container4}>{props?.type}</h1>
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
