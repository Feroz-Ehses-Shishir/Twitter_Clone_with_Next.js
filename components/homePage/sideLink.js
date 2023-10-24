import styles from "./sideLink.module.css";

const sideLink = ({text,Icon}) => {
  
    return (
      <div className={styles.container}>
        <Icon/>
        <span className={styles.container}></span>
      </div>
    );
};

export default sideLink;