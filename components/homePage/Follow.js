import { FiSearch } from "react-icons/fi"
import styles from "./follow.module.css";

const Follow = () => {
    return (

        <div className={styles.container}>

            <div className={styles.container1}>
                <FiSearch />
                <input className={styles.container2} type="text" placeholder='Search Twitter' />
            </div>


            <div className='bg-[#16181C] rounded-[20px] text-white mt-4 px-4 py-4'>
                <h1 className='text-[20px] font-medium'>What's Happening</h1>

                {/* <TrendingList />
                <TrendingList />
                <TrendingList />
                <TrendingList />
                <TrendingList /> */}

            </div>

        </div>
    )
}

export default Follow;