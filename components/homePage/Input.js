import { useState } from "react";
import styles from "./input.module.css";
import { useSession, signOut, getSession } from "next-auth/react";

const Input = () => {
  const { data: session } = useSession();
  const [input, setInput] = useState("");

  return (
    <div className={styles.container}>
      <div className={styles.container_2}>
        <div>
          <img className={styles.img} src={session?.user?.image} alt="" />
        </div>
        <div className={styles.container_3}>
          <textarea
            className={styles.container_4}
            rows="2"
            placeholder="What's Happening?"
            value={input}
            onChange={(e) => setInput(e.target.value)}
          />
        </div>
      </div>
    </div>
  );
};

export default Input;
