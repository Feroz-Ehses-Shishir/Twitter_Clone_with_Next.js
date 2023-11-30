import { useSession } from "next-auth/react";
import styles from "./message_box.module.css";

const MessageBox = ({ allMessages, message, setMessage, handleSubmit, isRead}) => {
  const { data: session } = useSession();

  let name, img;
  if (allMessages?.firstUserId?._id !== session?.user.uid) {
    name = allMessages?.firstUserId?.name;
    img = allMessages?.firstUserId?.img;
  } else {
    name = allMessages?.secondUserId?.name;
    img = allMessages?.secondUserId?.img;
  }

  return (
    <div className={styles.chat_container_main}>
      <div className={styles.chat_container}>
        <div className={styles.header}>
          <img className={styles.container6} alt="Avatar" src={img} />
          <div className={styles.container7}>{name}</div>
        </div>
        <div className={styles.chat_body}>
          {allMessages?.chat?.map((msg, i) => (
            <div key={i}>
              {msg.from == session?.user?.uid ? (
                <>
                  <p className={styles.chat2}>{msg.message}</p>
                  {(msg.seen=="Yes") && <div className={styles.chat2_seen}>Read</div>}
                </>
              ) : (
                <p className={styles.chat1}>{msg.message}</p>
              )}
            </div>
          ))}
        </div>
        <div className={styles.chat_footer}>
          <form onSubmit={handleSubmit}>
            <input
              className={styles.chat_footer_input}
              value={message}
              type="text"
              placeholder="Enter your message"
              onChange={(e) => setMessage(e.target.value)}
            ></input>
            <button className={styles.chat_footer_button}>SEND</button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default MessageBox;
