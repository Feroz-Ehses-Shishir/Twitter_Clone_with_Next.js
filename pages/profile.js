import { useSession, signIn, signOut, getSession } from "next-auth/react";
import styles from "../styles/homePage.module.css";
import SideBar from "../components/homePage/Side-Bar";
import Feed from "../components/homePage/Feed";
import Profile from "../components/profile/Profile";
import Follow from "../components/homePage/Follow";
import { useContext, useEffect, useState } from "react";
import { AppContext } from "../contexts/AppContext";
import { followUserActions, userActions } from "../libs/actions/user-actions";
import { useActionDispatcher } from "../hooks/use-action-dispatcher";
import { useRouter } from "next/router";

const profile = () => {
  const { data: session } = useSession();
  const [userState, userDispatch] = useActionDispatcher();
  const [state, dispatch] = useActionDispatcher();

  const [isFinish, setIsFinish] = useState(false);
  const [page,setPage] = useState(0);

  const router = useRouter();
  const id = router.query.id;

  const [profile_id,setProfile_id] = useState(id);

  useEffect(() => {
    userDispatch(userActions.GET_BY_ID, { id: id });
    dispatch(followUserActions.GET, { Id: session?.user?.uid });
    setPage(0);
  }, [id]);

  const isFollow = userState?.followers?.includes(session?.user?.uid);

  return (
    <div className={styles.container}>
      <SideBar></SideBar>
      <div className={styles.feed_container}>
        <Profile
          isFollow={isFollow}
          user={userState}
          dispatch={userDispatch}
          profile_id={id}
          page={page}
          setPage={setPage}
          setIsFinish={setIsFinish}
          isFinish={isFinish}
        />
        <Follow profile_id={profile_id} user={state} dispatch={userDispatch} userdispatch={userDispatch}/>
      </div>
    </div>
  );
};

export async function getServerSideProps({ req }) {   
  const session = await getSession({ req });

  if (!session) {
    return {
      redirect: {
        destination: "/",
        permanent: false,
      },
    };
  }

  return {
    props: { session },
  };
}

export default profile;
