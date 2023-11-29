import { useSession, signIn, signOut, getSession } from "next-auth/react";
import styles from "../styles/homePage.module.css";
import SideBar from "../components/homePage/Side-Bar";
import { useContext, useEffect, useState } from "react";
import { AppContext } from "../contexts/AppContext";
import {
  followUserActions,
  messageActions,
  userActions,
} from "../libs/actions/user-actions";
import { useActionDispatcher } from "../hooks/use-action-dispatcher";
import MessageUserList from "../components/message/Message-User-List";
import io from "socket.io-client";
import { useRouter } from "next/router";
import MessageBox from "../components/message/message-box";
let socket;

const messages = () => {
  const { data: session } = useSession();
  const [followList, dispatchFollowList] = useActionDispatcher([]);
  const [message, setMessage] = useState("");
  const [allMessages, dispatchAllMessages] = useActionDispatcher();
  const [newMessage, setNewMessage] = useState();
  const [isRead,setIsRead] = useState();

  const router = useRouter();
  const id = router.query.id;

  useEffect(() => {
    socketInitializer();
    dispatchFollowList(followUserActions.GET_FOLLOWING_LIST, {
      Id: session?.user?.uid,
    });
  }, []);

  useEffect(() => {
    dispatchAllMessages(messageActions.GET, {
      id_1: session?.user?.uid,
      id_2: id,
    });

    if (id !== undefined) {
      socket?.emit("message-seen", {
        to: id,
        from: session?.user?.uid,
        type: "first"
      });
    }
  }, [id]);

  useEffect(() => {
    if (newMessage !== undefined) {
      dispatchAllMessages(messageActions.SET, newMessage);
      if (newMessage.to === session?.user?.uid) {
        socket?.emit("message-seen", {
          to: id,
          from: session?.user?.uid,
          id: newMessage._id,
        });
      }
    }
  }, [newMessage]);

  async function socketInitializer() {
    await fetch("/api/socket");

    socket = io();

    socket.on("receive-message", (data) => {
      setNewMessage(data);
    });

    socket.on("message-seen", (data) => {
      if(data.seenBy==id){
        setIsRead(true);
      }
    });
  }

  function handleSubmit(e) {
    e.preventDefault();

    socket.emit("send-message", {
      message,
      to: id,
      from: session?.user?.uid,
      seen: "No",
      time: Date.now(),
    });

    setMessage("");
    setIsRead(false);
  }

  return (
    <div className={styles.container}>
      <SideBar></SideBar>
      <div className={styles.feed_container}>
        {followList !== undefined && (
          <MessageUserList followList={followList}></MessageUserList>
        )}
        <MessageBox
          allMessages={allMessages}
          message={message}
          setMessage={setMessage}
          handleSubmit={handleSubmit}
          isRead={isRead}
        ></MessageBox>
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
