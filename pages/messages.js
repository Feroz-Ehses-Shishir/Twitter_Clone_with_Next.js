import { useSession, signIn, signOut, getSession } from "next-auth/react";
import styles from "../styles/homePage.module.css";
import SideBar from "../components/homePage/Side-Bar";
import { useContext, useEffect, useState } from "react";
import { AppContext } from "../contexts/AppContext";
import { followUserActions, messageActions, userActions } from "../libs/actions/user-actions";
import { useActionDispatcher } from "../hooks/use-action-dispatcher";
import MessageUserList from "../components/message/Message-User-List";
import io from "socket.io-client";
import { useRouter } from "next/router";
let socket;

const messages = () => {
  const { data: session } = useSession();
  const [followList, dispatchFollowList] = useActionDispatcher([]);
  const [message, setMessage] = useState("");
  const [allMessages, dispatchAllMessages] = useActionDispatcher([]);

  const router = useRouter();
  const id = router.query.id;

  useEffect(() => {
    socketInitializer();
    dispatchFollowList(followUserActions.GET_FOLLOWING_LIST, { Id: session?.user?.uid });
  }, []);

  useEffect(() => {
    dispatchFollowList(messageActions.GET, { id_1: session?.user?.uid, id_2:id });
  }, [id]);

  console.log(allMessages);

  async function socketInitializer() {
    await fetch("/api/socket");

    socket = io();

    socket.on("receive-message", (data) => {
      // setAllMessages((pre) => [...pre, data]);
    });
  }

  function handleSubmit(e) {
    e.preventDefault();

    socket.emit("send-message", {
      message,
      to:id,
      from:session?.user?.uid
    });

    setMessage("");
  }

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
            {/* {
              allMessages?.map((msg,i) => (
                <p key={i} className={styles.chat1}>{msg.message}</p>
              ))
            } */}
          </div>
          <div className={styles.chat_footer}>
            <form onSubmit={handleSubmit}>
              <input value={message} type="text" placeholder="Enter your message" onChange={(e) => setMessage(e.target.value)}></input>
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
