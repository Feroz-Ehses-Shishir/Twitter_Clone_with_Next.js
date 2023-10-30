import styles from "./feed.module.css";
import Input from "./Input";
import Post from "./Post";

const Feed = () => {
  return (
    <div className={styles.container}>
      <div className={styles.container_2}>
        Home
      </div>
      <Input/>
      <Post/>
      {/* {posts.map((post) => (
        <Post></Post>
      ))} */}
    </div>
  );
};

export default Feed;
