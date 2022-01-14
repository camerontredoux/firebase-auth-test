import Head from "next/head";
import Image from "next/image";
import { useAuth } from "@utils/auth";

export default function Home() {
  const auth = useAuth();

  return (
    <div className="font-body flex flex-col items-center justify-center min-h-screen py-2 bg-gray-300">
      <Head>
        <title>Create Next App</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      {auth?.user ? (
        <button
          onClick={() => console.log(auth?.signout())}
          className="font-bold hover:rounded-lg text-sm text-white hover:text-gray-900 transition ease duration-150 hover:bg-white py-1 px-4 rounded border-2 border-white bg-sky-300 shadow-sm hover:shadow-md"
        >
          Sign Out
        </button>
      ) : (
        <button
          onClick={() => console.log(auth?.signinWithGitHub())}
          className="font-bold hover:rounded-lg text-sm text-white hover:text-gray-900 transition ease duration-150 hover:bg-white py-1 px-4 rounded border-2 border-white bg-sky-300 shadow-sm hover:shadow-md"
        >
          Sign In
        </button>
      )}
      <div>Current user: {auth?.user?.email}</div>
      <div>
        <Image
          className="rounded-full"
          width="80"
          height="80"
          src={
            auth?.user?.photoURL
              ? auth.user.photoURL
              : "https://avatars.githubusercontent.com/u/424443?v=4"
          }
          alt={auth?.user?.displayName ? auth.user.displayName : "Profile"}
        />
      </div>
    </div>
  );
}
