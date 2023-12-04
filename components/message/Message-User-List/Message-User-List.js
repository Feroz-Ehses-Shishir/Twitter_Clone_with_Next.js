import { useRouter } from "next/router";
import styles from "./message_user_list.module.css";
import { FiSearch } from "react-icons/fi";
import { useContext, useEffect } from "react";
import { AppContext } from "../../../contexts/AppContext";
import io from "socket.io-client";
import { useSession } from "next-auth/react";
let socket;

const MessageUserList = ({ followList, setUserId,id}) => {
  const router = useRouter();
  const { data: session } = useSession();

  const [notification, setNotification] = useContext(AppContext);

  const profile = (id) => {
    setNotification();
    router.push({
      pathname: "/messages",
      query: { id: id },
    });
  };

  return (
    <div className={styles.container}>
      <div className={styles.container1}>
        <FiSearch />
        <input
          className={styles.container22}
          type="text"
          placeholder="Search"
        />
      </div>
      <div className={styles.container2}>
        <div className={styles.container3}>
          {followList?.map((user, i) => (
            <div
              onClick={() => profile(user?._id)}
              className={styles.container4}
              key={i}
            >
              <div className={styles.container5}>
                <img
                  className={styles.container6}
                  alt="Avatar"
                  src={user?.img}
                />
                {(notification?.from == user?._id && id!==notification?.from) ? (
                  <div className={styles.container9}>
                    <p className={styles.container34}>{user?.name}</p>
                    <p className={styles.container44}>new message</p>
                  </div>
                ) : (
                  <div className={styles.container8}>
                    <p className={styles.container33}>{user?.name}</p>
                    <p className={styles.container44}>@{user?.name}</p>
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default MessageUserList;
