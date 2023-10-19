import { useState } from "react";
import axios from "axios";
import styles from "./SingUpForm.module.css";
import { useRouter } from "next/router";

const SignUp = (props) => {

  const router = useRouter();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    await axios
    .post(`/api/users`, { name: name, email: email, password: password })
    .then((res) => {
        setName("");
        setEmail("");
        setPassword("");
        props.setIsOpenSignUp(false);
        router.push('/home');
      })
      .catch((err) => console.log(err));
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
            onChange={(e) => setName(e.target.value)}
          />
        </div>
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
        <div>
          <input
            placeholder="Confirm Password"
            type="password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
          />
        </div>
        <button type="submit">Register</button>
      </form>
    </div>
  );
};

export default SignUp;