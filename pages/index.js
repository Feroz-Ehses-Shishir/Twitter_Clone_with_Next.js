import styles from '../styles/Home.module.css';
import Login from '../component/Login';

export default function Home() {
  return (
    <div className={styles.container}>
      <Login></Login>
    </div>
  )
}
