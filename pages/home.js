import { useSession, signIn, signOut, getSession } from "next-auth/react";
import styles from "../styles/homePage.module.css";
import SideBar from "../components/homePage/Side-Bar";
import Feed from "../components/homePage/Feed";
import Follow from "../components/homePage/Follow";
import { followUserActions, userActions } from "../libs/actions/user-actions";
import { useActionDispatcher } from "../hooks/use-action-dispatcher";
import { useEffect } from "react";

let socket;

const Home = () => {

  const { data: session } = useSession();
  const [userState, userDispatch] = useActionDispatcher();
  const [state, dispatch] = useActionDispatcher();

  useEffect(() => {
    socketInitializer();
    userDispatch(userActions.GET_BY_ID, { id: session?.user?.uid });
    dispatch(followUserActions.GET,{Id:session?.user?.uid});
  }, []);

  return (
    <div className={styles.container}>
      <SideBar></SideBar>
      <div className={styles.feed_container}>
        <Feed/>
        <Follow user={state} dispatch={userDispatch}></Follow>
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

export default Home;
