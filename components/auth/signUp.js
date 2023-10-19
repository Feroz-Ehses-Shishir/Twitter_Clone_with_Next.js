import { useState } from "react";
import styles from "./singUpForm.module.css";
import signUpAction from "../../libs/actions/signUpAction";
import { useRouter } from "next/router";

const SignUp = (props) => {

  const router = useRouter();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error,setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    const res = await signUpAction(name,email,password,confirmPassword);
    
    if(res=="Ok"){
        setName("");
        setEmail("");
        setPassword("");
        props.setIsOpenSignUp(false);
        router.push('/home');
    }
    else{
      setError(res);
    }
  };

  return (
    <div className={styles.container}>
      <form onSubmit={handleSubmit}>
        <div>Create Your Account</div>
        <div>
          <input
            placeholder="Name"
            type="text"
            value={name}
            onChange={(e) => {setName(e.target.value),setError("")}}
          />
        </div>
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
        <div>
          <input
            placeholder="Confirm Password"
            type="password"
            value={confirmPassword}
            onChange={(e) => {setConfirmPassword(e.target.value),setError("")}}
          />
        </div>
        {error?(<p className={styles.error}>{error}</p>):(<p></p>)}
        <button type="submit">Register</button>
      </form>
    </div>
  );
};

export default SignUp;