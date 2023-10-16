import { BsTwitter } from "react-icons/bs";
import { FcGoogle } from "react-icons/fc";
import { FaXTwitter } from "react-icons/fa6";
import styles from "./Login.module.css";

const Login = () => {
  return (
    <div className={styles.container}>
      <div className={styles.left_side}>
        <FaXTwitter className={styles.left_icon} />
      </div>

      <div className={styles.right_side}>
        <h1>Happening now</h1>
        <h3>Join today.</h3>
        <div className={styles.Oauth} onClick={() => signIn("google")}>
          <FcGoogle className={styles.right_icon}/>
          SignIn with Google
        </div>
      </div>
    </div>
  );
};

export default Login;
