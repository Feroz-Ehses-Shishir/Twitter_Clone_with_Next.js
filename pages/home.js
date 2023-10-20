import { useSession, signIn, signOut, getSession } from "next-auth/react";

const Home = () => {
  const { data: session } = useSession();

  // console.log(session.user);

  function handleSignOut(){
    signOut();
  }

  return (
    <div>
      <p>{session.user.email}</p>
      <button onClick={handleSignOut}>Sign Out</button>
    </div>
  );
};

export async function getServerSideProps({ req }) {
  const session = await getSession({req});

  if (!session) {
    return {
      redirect: {
        destination: "/",
        permanent: false,
      },
    };
  }

  return {
    props: { session },
  };
}

export default Home;
