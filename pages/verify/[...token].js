import Link from "next/link";
import { connectMongoDB } from "../../libs/MongoConnect";
import user from "../../libs/models/userModel";

const token = (props) => {

    return (
        <div>
           <p>You are Verified</p>
           <p>Now You can sign in, <Link href="/">Click Here</Link></p>
        </div>
    );
}

export const getServerSideProps = async (ctx) => {
    let verify = "No"
    const {params} = ctx;
    await connectMongoDB();
    const result = await user.findOneAndUpdate({ _id: params.token },{verifyUser: "Yes" });

    if(result){
        verify = "Yes";
    }

    return {
        props:{verify},
        redirect: {
            destination: '/', 
            permanent: false, 
          },
    }
}

export default token;