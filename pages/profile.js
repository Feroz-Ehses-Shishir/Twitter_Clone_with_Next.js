import { useSession, signIn, signOut, getSession } from "next-auth/react";
import styles from "../styles/homePage.module.css";
import SideBar from "../components/homePage/Side-Bar";
import Feed from "../components/homePage/Feed";
import Profile from "../components/profile/Profile";
import Follow from "../components/homePage/Follow";

const profile = () => {
   const { data: session } = useSession();

    return (
        <div className={styles.container}>
          <SideBar></SideBar>
          <div className={styles.feed_container}>
            <Profile id={session?.user?.uid}/>
            <Follow/>
          </div>
        </div>
      );
}

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