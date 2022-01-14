import Head from "next/head";
import { useAuth } from "../utils/auth";

export default function Home() {
  const auth = useAuth();

  return (
    <div className="flex flex-col items-center justify-center min-h-screen py-2 bg-gray-300">
      <Head>
        <title>Create Next App</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <button
        onClick={() => auth?.signinWithGitHub()}
        className="font-bold hover:rounded-lg text-sm text-white hover:text-gray-900 transition ease duration-150 hover:bg-white py-1 px-4 rounded border-2 border-white bg-sky-300 shadow-sm hover:shadow-md"
      >
        Sign In
      </button>
      <div>{auth?.user?.email}</div>
      {auth?.user ? (
        <button
          onClick={() => auth?.signout()}
          className="font-bold hover:rounded-lg text-sm text-white hover:text-gray-900 transition ease duration-150 hover:bg-white py-1 px-4 rounded border-2 border-white bg-sky-300 shadow-sm hover:shadow-md"
        >
          Sign Out
        </button>
      ) : null}
    </div>
  );
}
