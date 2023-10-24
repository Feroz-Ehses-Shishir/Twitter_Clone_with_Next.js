import { useSession, signIn, signOut, getSession } from "next-auth/react";
import styles from "../styles/homePage.module.css";
import SideBar from "../components/homePage/sideBar";

const Home = () => {
  const { data: session } = useSession();

  function handleSignOut() {
    signOut();
  }

  return (
    <div className={styles.container}>
      <SideBar></SideBar>
      {/* <p>{session.user.email}</p>
      <button onClick={handleSignOut}>Sign Out</button> */}
      
    </div>
  );
};


export async function getServerSideProps({ req }) {
  const session = await getSession({ req });

  // if (!session) {
  //   return {
  //     redirect: {
  //       destination: "/",
  //       permanent: false,
  //     },
  //   };
  // }

  return {
    props: { session },
  };
}

export default Home;
