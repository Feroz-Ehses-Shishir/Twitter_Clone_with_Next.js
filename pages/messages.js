import { useSession, signIn, signOut, getSession } from "next-auth/react";
import styles from "../styles/homePage.module.css";
import SideBar from "../components/homePage/Side-Bar";
import { useContext, useEffect, useState } from "react";
import { AppContext } from "../contexts/AppContext";
import { followUserActions, userActions } from "../libs/actions/user-actions";
import { useActionDispatcher } from "../hooks/use-action-dispatcher";
import MessageUserList from "../components/message/Message-User-List";

const messages = () => {
  const { data: session } = useSession();
  const [followList, dispatchFollowList] = useActionDispatcher([]);

  useEffect(() => {
    dispatchFollowList(followUserActions.GET_FOLLOWING_LIST, { Id: session?.user?.uid });
  }, []);

  return (
    <div className={styles.container}>
      <SideBar></SideBar>
      <div className={styles.feed_container}>
        {followList!==undefined && <MessageUserList followList={followList}></MessageUserList>}
        <div className={styles.chat_container_main}>
        <div className={styles.chat_container}>
          <div className={styles.header}>
            <div>Name</div>
          </div>
          <div className={styles.chat_body}>
            <p className={styles.chat1}>Hi</p>
            <p className={styles.chat2}>Hello</p>
            <p className={styles.chat1}>Hi</p>
            <p className={styles.chat2}>Hello</p>
            <p className={styles.chat1}>Hi</p>
            <p className={styles.chat2}>Hello</p>
            <p className={styles.chat1}>Hi</p>
            <p className={styles.chat2}>Hello</p>
            <p className={styles.chat1}>Hi</p>
            <p className={styles.chat2}>Hello</p>
            <p className={styles.chat1}>Hi</p>
            <p className={styles.chat2}>Hello</p>
          </div>
          <div className={styles.chat_footer}>
            <form>
              <input type="text"></input>
              <button>SEND</button>
            </form>
          </div>
        </div>
        </div>
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

export default messages;
