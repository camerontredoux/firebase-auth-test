import { useAuth } from "@/utils/auth";
import Head from "next/head";
import { LinkGithub } from ".";

const Dashboard = () => {
  const auth = useAuth();
  return (
    <div className="flex flex-1 flex-col items-center justify-start gap-5 py-10">
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
        <code className="font-body rounded bg-white p-2 text-sm shadow-sm">
          {auth?.user?.email ? auth.user.email : "No user logged in"}
        </code>
        <div className="h-10 w-10 rounded-full border-2 border-white shadow-md">
          {auth?.user?.photoURL ? (
            <img
              src={auth.user.photoURL}
              alt={auth?.user?.displayName ? auth.user.displayName : "Profile"}
              className="h-24 w-24 rounded-full"
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
