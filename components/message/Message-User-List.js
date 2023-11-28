import { useRouter } from "next/router";
import styles from "./message_user_list.module.css";
import { FiSearch } from "react-icons/fi";

const MessageUserList = ({followList,setUserId}) => {

  const router = useRouter();

  const profile = (id) => {
    router.push({
      pathname: "/messages",
      query: { id: id },
    });
  }

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
          {followList?.map((user,i) => (
            <div onClick={() => profile(user?._id)} className={styles.container4} key={i}>
              <div className={styles.container5}>
                <img
                  className={styles.container6}
                  alt="Avatar"
                  src={user?.img}
                />
                <div className={styles.container8}>
                  <p className={styles.container33}>
                    {user?.name}
                  </p>
                  <p className={styles.container44}>@{user?.name}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default MessageUserList;