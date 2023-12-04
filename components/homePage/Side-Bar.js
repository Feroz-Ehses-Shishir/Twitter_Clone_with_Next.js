import styles from "./sideBar.module.css";
import { FaXTwitter } from "react-icons/fa6";
import { AiFillHome, AiOutlineInbox, AiOutlineUser } from "react-icons/ai";
import { BiHash } from "react-icons/bi";
import { BsBell, BsBookmark, BsThreeDots, BsTwitter } from "react-icons/bs";
import {
  HiOutlineClipboardList,
  HiOutlineDotsCircleHorizontal,
} from "react-icons/hi";
import SideLink from "./Side-Link";
import { useSession, signOut, getSession } from "next-auth/react";
import Link from "next/link";
import { useRouter } from "next/router";
import { useContext } from "react";
import { AppContext } from "../../contexts/AppContext";

const SideBar = () => {
  const { data: session } = useSession();
  const router = useRouter();
  const [notification, setNotification] = useContext(AppContext);

  const profile = () => {
    router.push({
      pathname: "/profile",
      query: { id: session?.user?.uid },
    });
  };

  const message = () => {
    setNotification();
    router.push({
      pathname: "/messages",
    });
  };

  function handleSignOut() {
    signOut();
  }

  return (
    <div className={styles.container}>
      <div className={styles.links_container}>
        <Link href="/home">
          <a>
            <SideLink text="" Icon={FaXTwitter} />
          </a>
        </Link>
        <Link href="/home">
          <a>
            <SideLink text="Home" Icon={AiFillHome} />
          </a>
        </Link>
        <SideLink text="Explore" Icon={BiHash} />
        <SideLink text="Notifications" Icon={BsBell} />
        {notification ? (
          <div className={styles.container_message_noti} onClick={message}>
            <SideLink text="Messages !" Icon={AiOutlineInbox} />
          </div>
        ) : (
          <div onClick={message}>
            <SideLink text="Messages" Icon={AiOutlineInbox} />
          </div>
        )}

        <SideLink text="Bookmarks" Icon={BsBookmark} />
        <SideLink text="Lists" Icon={HiOutlineClipboardList} />
        <div onClick={profile}>
          <SideLink text="Profile" Icon={AiOutlineUser} />
        </div>
        <SideLink text="More" Icon={HiOutlineDotsCircleHorizontal} />
      </div>
      <button className={styles.tweet}>Tweet</button>
      <button onClick={handleSignOut} className={styles.logout}>
        Logout @{session?.user?.name}
      </button>
    </div>
  );
};

export default SideBar;
