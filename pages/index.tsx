import Head from "next/head";
import Image from "next/image";
import { useAuth } from "@utils/auth";

export default function Home() {
  const auth = useAuth();

  return (
    <div className="font-body flex flex-col gap-5 items-center justify-center min-h-screen py-2 bg-gray-300">
      <Head>
        <title>Create Next App</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <div>
        {auth?.user ? (
          <button
            onClick={() => console.log(auth?.signout())}
            className="font-bold hover:rounded-lg text-sm text-white hover:text-gray-900 transition ease duration-150 hover:bg-white py-[0.375rem] px-4 rounded border-2 border-white bg-sky-300 shadow-sm hover:shadow-md"
          >
            Sign Out
          </button>
        ) : (
          <button
            onClick={() => console.log(auth?.signinWithGitHub())}
            className="font-bold hover:rounded-lg text-sm text-white hover:text-gray-900 transition ease duration-150 hover:bg-white py-[0.375rem] px-4 rounded border-2 border-white bg-sky-300 shadow-sm hover:shadow-md"
          >
            Sign In
          </button>
        )}
      </div>
      <div className="flex items-center gap-2">
        Current user:{" "}
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
    </div>
  );
}
