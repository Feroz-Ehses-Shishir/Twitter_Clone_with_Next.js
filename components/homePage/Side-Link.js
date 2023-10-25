import styles from "./sideLink.module.css";

const sideLink = ({text,Icon}) => {
  
    let css_class = "container";
    if(Icon==""){
      css_class = "_";
    }

    return (
      <div className={`${text? styles.container:styles.logo}`}>
        <Icon/>
        <span className={styles.latter}>{text}</span>
      </div>
    );
};

export default sideLink;