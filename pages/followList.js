import { useSession, signIn, signOut, getSession } from "next-auth/react";
import styles from "../styles/homePage.module.css";
import SideBar from "../components/homePage/Side-Bar";
import Feed from "../components/homePage/Feed";
import Profile from "../components/profile/Profile";
import Follow from "../components/homePage/Follow";
import { useContext, useEffect } from "react";
import { AppContext } from "../contexts/AppContext";
import { followUserActions, userActions } from "../libs/actions/user-actions";
import { useActionDispatcher } from "../hooks/use-action-dispatcher";
import { useRouter } from "next/router";
import Following_Followers from "../components/profile/Following-Followers";

const followList = () => {
  const { data: session } = useSession();
  const [userState, userDispatch] = useActionDispatcher();
  const [state, dispatch] = useActionDispatcher();
  const [followList, dispatchFollowList] = useActionDispatcher();

  const router = useRouter();
  const id = router.query.id;

  useEffect(() => {
    if (id !== undefined) {
      userDispatch(userActions.GET_BY_ID, { id: id });
      if(router.query.type=="Following"){
        dispatchFollowList(followUserActions.GET_FOLLOWING_LIST, { Id: id });
      }
      else{
        dispatchFollowList(followUserActions.GET_FOLLOWERS_LIST, { Id: id });
      }
    }
  }, [id]);

  useEffect(() => {
    if (session?.user?.uid !== undefined) {
      dispatch(followUserActions.GET, { Id: session?.user?.uid });
    }
  }, [session?.user?.uid]);

  return (
    <div className={styles.container}>
      <SideBar></SideBar>
      <div className={styles.feed_container}>
        <Following_Followers
          current_user={userState}
          type={router.query.type}
          profile_id={id}
          user={followList}
          dispatch={userDispatch}
          userdispatch={userDispatch}
        ></Following_Followers>
        <Follow
          profile_id={id}
          user={state}
          dispatch={userDispatch}
          userdispatch={userDispatch}
        />
      </div>
    </div>
  );
};

export default followList;
