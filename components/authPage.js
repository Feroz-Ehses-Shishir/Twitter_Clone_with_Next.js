import { BsGithub } from "react-icons/bs";
import { FaXTwitter } from "react-icons/fa6";
import styles from "./authPage.module.css";
import { useRouter } from "next/router";
import { useState } from "react";
import Modal from "./Modal";
import SignUp from "./auth/signUp";
import SignIn from "./auth/signIn";
import { useSession, signIn, signOut } from "next-auth/react";
import toast, { Toaster } from 'react-hot-toast';

const AuthPage = () => {
  const router = useRouter();
  const [isOpenSignUp, setIsOpenSignUp] = useState(false);
  const [isOpenSignIn, setIsOpenSignIn] = useState(false);

  const handleOauth = async () => {
    signIn('github',{callbackUrl:"http://localhost:3000/home"});
  }

  const handleModalSignUp = () => {
    setIsOpenSignUp(true);
  };

  const handleModalSignIn = () => {
    setIsOpenSignIn(true);
  };

  const closeModal = () => {
    setIsOpenSignUp(false);
    setIsOpenSignIn(false);
  };

  return (
    <>
    <div><Toaster/></div>
    <div className={styles.container}>
      <div className={styles.left_side}>
        <FaXTwitter className={styles.left_icon} />
      </div>

      <div className={styles.right_side}>
        <h1>Happening now</h1>
        <h3>Join today.</h3>
        <div className={styles.auth} onClick={handleOauth}>
          <BsGithub className={styles.right_icon} />
          Sign Up with Github
        </div>
        <button onClick={handleModalSignUp} className={styles.btn1}>Create Account</button>
        <Modal isOpen={isOpenSignUp} closeModal={closeModal}>
          <SignUp setIsOpenSignUp={setIsOpenSignUp} toast={toast}></SignUp>
        </Modal>
        <h4>Already have an account?</h4>
        <button onClick={handleModalSignIn} className={styles.btn2}>Sign In</button>
        <Modal isOpen={isOpenSignIn} closeModal={closeModal}>
          <SignIn></SignIn>
        </Modal>
      </div>
    </div>
    </>
  );
};

export default AuthPage;