import { BsGithub } from "react-icons/bs";
import { FaXTwitter } from "react-icons/fa6";
import styles from "./AuthPage.module.css";
import { useRouter } from "next/router";
import { useState } from "react";
import Modal from "../component/Modal"
import SignUp from "./auth/signUp";

const AuthPage = () => {
  const router = useRouter();
  const [isOpen, setIsOpen] = useState(false);

  const handleSignUp = () => {
    setIsOpen(true);
  };

  const closeModal = () => {
    setIsOpen(false);
  };

  const handleSignIn = () => {
    router.push("/auth/signIn");
  };

  return (
    <div className={styles.container}>
      <div className={styles.left_side}>
        <FaXTwitter className={styles.left_icon} />
      </div>

      <div className={styles.right_side}>
        <h1>Happening now</h1>
        <h3>Join today.</h3>
        <div className={styles.auth} onClick={() => signIn("google")}>
          <BsGithub className={styles.right_icon} />
          Sign Un with Github
        </div>
        <button onClick={handleSignUp} className={styles.btn1}>Create Account</button>
        <Modal isOpen={isOpen} closeModal={closeModal}>
          <SignUp></SignUp>
        </Modal>
        <h4>Already have an account?</h4>
        <button onClick={handleSignIn} className={styles.btn2}>Sign In</button>
      </div>
    </div>
  );
};

export default AuthPage;
