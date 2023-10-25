import styles from "./feed.module.css";
import { HiOutlineSparkles } from "react-icons/hi";
import Input from "./Input";

const Feed = () => {
  return (
    <div className={styles.container}>
      <div className={styles.container_2}>
        Home
        {/* <HiOutlineSparkles /> */}
      </div>
      <Input/>
    </div>
  );
};

export default Feed;
