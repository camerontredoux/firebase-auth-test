import { useAuth } from "@utils/auth";
import Head from "next/head";
import { LinkGithub } from "pages";
import Image from "next/image";

const Dashboard = () => {
  const auth = useAuth();
  return (
    <div className="flex flex-col flex-1 gap-5 justify-center items-center py-10">
      <Head>
        <title>Dashboard</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      {auth?.user ? (
        <>
          <div className="">{auth?.user?.displayName}</div>
          <LinkGithub />
        </>
      ) : (
        <div className="">You must be signed in to view this page.</div>
      )}
      <div className="flex items-center gap-2">
        <code className="font-body p-2 text-sm shadow-sm bg-white rounded">
          {auth?.user?.email ? auth.user.email : "No user logged in"}
        </code>
        <div className="shadow-md w-10 h-10 rounded-full border-2 border-white">
          {auth?.user?.photoURL ? (
            <Image
              className="rounded-full"
              width="96"
              height="96"
              src={auth.user.photoURL}
              alt={auth?.user?.displayName ? auth.user.displayName : "Profile"}
            />
          ) : null}
        </div>
      </div>
      {auth?.user
        ? auth.user.providerData.map((providerId) => (
            <div key={providerId}>{providerId}</div>
          ))
        : null}
    </div>
  );
};

export default Dashboard;
