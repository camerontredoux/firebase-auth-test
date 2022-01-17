import { useAuth } from "@utils/auth";
import Head from "next/head";

const Dashboard = () => {
  const auth = useAuth();
  return (
    <div className="py-10 flex flex-col items-center">
      <Head>
        <title>Dashboard</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      {auth?.user ? (
        <div className="">{auth?.user?.displayName}</div>
      ) : (
        <div className="">You must be signed in to view this page.</div>
      )}
    </div>
  );
};

export default Dashboard;
