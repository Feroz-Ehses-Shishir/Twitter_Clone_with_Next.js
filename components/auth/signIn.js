import { useState } from "react";
import styles from "./singInForm.module.css";
import { useSession, signIn, signOut } from "next-auth/react";
import { BsGithub } from "react-icons/bs";

const signInc = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleOauth = async () => {
    signIn('github',{callbackUrl:"http://localhost:3000/home"});
  };

  const handleSubmit = (e) => {
    e.preventDefault();
  };

  return (
    <div className={styles.container}>
      <form onSubmit={handleSubmit}>
        <div>Sign In</div>
        <div>
          <input
            placeholder="Email"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        <div>
          <input
            placeholder="Password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <button type="submit">Sign In</button>
        <p>OR</p>
      </form>
      <div className={styles.auth} onClick={handleOauth}>
        <BsGithub className={styles.right_icon} />
        Sign In with Github
      </div>
    </div>
  );
};

export default signInc;
