import styles from '../styles/Home.module.css';
import AuthPage from '../component/AuthPage';

export default function Home() {
  return (
    <div className={styles.container}>
      <AuthPage></AuthPage>
    </div>
  )
}
