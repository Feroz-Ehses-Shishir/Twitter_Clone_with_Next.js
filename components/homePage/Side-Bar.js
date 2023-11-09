import styles from "./sideBar.module.css";
import { FaXTwitter } from "react-icons/fa6";
import { AiFillHome, AiOutlineInbox, AiOutlineUser } from "react-icons/ai"
import { BiHash } from "react-icons/bi"
import { BsBell, BsBookmark, BsThreeDots, BsTwitter } from "react-icons/bs"
import { HiOutlineClipboardList, HiOutlineDotsCircleHorizontal } from "react-icons/hi"
import SideLink from "./Side-Link";
import { useSession, signOut, getSession } from "next-auth/react";
import Link from 'next/link';

const SideBar = () => {

  const { data: session } = useSession();

  // console.log(session.user);

  function handleSignOut() {
    signOut();
  }

  return (
    <div className={styles.container}>
      <div className={styles.links_container}>
        <Link href="/home"><a><SideLink text="" Icon={FaXTwitter} /></a></Link>
        <Link href="/home"><a><SideLink text="Home" Icon={AiFillHome} /></a></Link>
        <SideLink text="Explore" Icon={BiHash} />
        <SideLink text="Notifications" Icon={BsBell} />
        <SideLink text="Messages" Icon={AiOutlineInbox} />
        <SideLink text="Bookmarks" Icon={BsBookmark} />
        <SideLink text="Lists" Icon={HiOutlineClipboardList} />
        <Link href="/profile"><a><SideLink text="Profile" Icon={AiOutlineUser}/></a></Link>
        <SideLink text="More" Icon={HiOutlineDotsCircleHorizontal} />
      </div>
      <button className={styles.tweet}>Tweet</button>
      <button onClick={handleSignOut} className={styles.logout}>Logout @{session?.user?.name}</button>
    </div>
  );
};

export default SideBar;
