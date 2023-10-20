import { useState } from "react";
import styles from "./singInForm.module.css";
import { useSession, signIn, signOut } from "next-auth/react";
import { BsGithub } from "react-icons/bs";
import { useRouter } from "next/router";

const signInc = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error,setError] = useState("");

  const handleOauth = async () => {
    signIn('github',{callbackUrl:"http://localhost:3000/home"});
  };

  const router = useRouter();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const status = await signIn('credentials',{
      redirect:false,
      email:email,
      password: password,
      callbackUrl:"/home"
    })
    console.log(status);
    if(status.ok){
      router.push(status.url);
    }
    else{
      setError(status.error);
    }
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
            onChange={(e) => {setEmail(e.target.value),setError("")}}
          />
        </div>
        <div>
          <input
            placeholder="Password"
            type="password"
            value={password}
            onChange={(e) => {setPassword(e.target.value),setError("")}}
          />
        </div>
        {error?(<p className={styles.error}>{error}</p>):(<p></p>)}
        <button type="submit">Sign In</button>
        <p>OR</p>
        <div className={styles.auth} onClick={handleOauth}>
        <BsGithub className={styles.right_icon} />
        Sign In with Github
      </div>
      </form>
    </div>
  );
};

export default signInc;
