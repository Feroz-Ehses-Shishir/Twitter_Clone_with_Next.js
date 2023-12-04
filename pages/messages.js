import { useSession, signIn, signOut, getSession } from "next-auth/react";
import styles from "../styles/homePage.module.css";
import SideBar from "../components/homePage/Side-Bar/Side-Bar";
import { useContext, useEffect, useState } from "react";
import { AppContext } from "../contexts/AppContext";
import {
  followUserActions,
  messageActions,
  userActions,
} from "../libs/actions/user-actions";
import { useActionDispatcher } from "../hooks/use-action-dispatcher";
import MessageUserList from "../components/message/Message-User-List/Message-User-List";
import io from "socket.io-client";
import { useRouter } from "next/router";
import MessageBox from "../components/message/Message-Box/message-box";
let socket;

const messages = () => {
  const { data: session } = useSession();
  const [followList, dispatchFollowList] = useActionDispatcher([]);
  const [message, setMessage] = useState("");
  const [allMessages, dispatchAllMessages] = useActionDispatcher();
  const [newMessage, setNewMessage] = useState();
  const [seen,setSeen] = useState();
  // const [notification, setNotification] = useContext(AppContext);

  const router = useRouter();
  const id = router.query.id;

  const seen_func = (type,msg_id) => {
    socket?.emit("message-seen-server", {
      to: id,
      from: session?.user?.uid,
      type: type,
      id: msg_id,
    });
  }

  useEffect(() => {
    dispatchFollowList(followUserActions.GET_FOLLOWING_LIST, {
      Id: session?.user?.uid,
    });
  }, []);

  useEffect(() => {
    
    dispatchAllMessages(messageActions.GET, {
      id_1: session?.user?.uid,
      id_2: id,
    });

    socketInitializer(session?.user?.uid,id);

    return () => {
      socket.disconnect();
    };

  }, [id]);

  useEffect(() => {
    if (newMessage !== undefined) {
      dispatchAllMessages(messageActions.SET, newMessage);
      if(newMessage.to==session.user.uid){
        seen_func("seen",newMessage._id);
      }
    }
  }, [newMessage]);

  useEffect(() => {
    dispatchAllMessages(messageActions.SEEN,{data: seen});
  }, [seen]);

  async function socketInitializer(id1,id2) {

    await fetch(`/api/socket`);

    function findMinMax(str1, str2) {
      const minValue = str1 < str2 ? str1 : str2;
      const maxValue = str1 > str2 ? str1 : str2;
      return { minValue, maxValue };
    }

    const { minValue, maxValue } = findMinMax(id1,id2);
    const roomId = minValue+maxValue;

    socket = io({
      query: {
        roomID:roomId
      }
    });

    seen_func("first");

    socket.on("receive-message", (data) => {
      setNewMessage(data);
    });

    socket.on("message-seen", (data) => {
      if(data?.from==session?.user?.uid){
        setSeen(data);
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
  }

  return (
    <div className={styles.container}>
      <SideBar></SideBar>
      <div className={styles.feed_container}>
        {followList !== undefined && (
          <MessageUserList followList={followList}></MessageUserList>
        )}
        {id!=undefined && <MessageBox
          allMessages={allMessages}
          message={message}
          setMessage={setMessage}
          handleSubmit={handleSubmit}
        ></MessageBox>}
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
