import styles from '../styles/Home.module.css';
import AuthPage from '../components/auth/Auth-Page/Auth-Page'

export default function Home() {
  return (
    <div className={styles.container}>
      <AuthPage></AuthPage>
    </div>
  )
}
