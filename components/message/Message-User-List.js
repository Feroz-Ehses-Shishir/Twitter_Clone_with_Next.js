import styles from "./message_user_list.module.css";
import { FiSearch } from "react-icons/fi";

const MessageUserList = ({followList}) => {

  console.log(followList);

  const profile = () => {
    
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
          {followList?.map((user) => (
            <div className={styles.container4}>
              <div className={styles.container5}>
                <img
                  className={styles.container6}
                  alt="Avatar"
                  src={user?.img}
                />
                <div className={styles.container8}>
                  <p onClick={profile} className={styles.container33}>
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
