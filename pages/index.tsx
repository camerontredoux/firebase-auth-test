import Head from "next/head";
import Image from "next/image";
import { useAuth } from "@utils/auth";
import Button from "@components/Button";

const LinkGithub = () => {
  const auth = useAuth();

  if (auth?.user) {
    if (!auth.user.providerData.includes("github.com")) {
      return (
        <Button
          icon={true}
          variant="github"
          text="Link GitHub Account"
          handleClick={() => auth.linkAccounts()}
        />
      );
    } else {
      return (
        <Button
          icon={true}
          variant="github"
          text="Unlink GitHub Account"
          handleClick={() => auth.unlinkAccount()}
        />
      );
    }
  }
  return null;
};

export default function Home() {
  const auth = useAuth();

  return (
    <div className="font-body flex flex-col gap-5 items-center justify-center py-10">
      <Head>
        <title>Cameron Tredoux's Portfolio</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <div className="flex flex-col gap-2">
        {auth?.user ? (
          <Button
            className={"signout w-52 justify-center"}
            variant="github"
            text={auth.user.displayName}
            handleClick={() => auth?.signout()}
          />
        ) : (
          <>
            <Button
              icon={true}
              variant="google"
              text="Continue with Google"
              handleClick={() => auth?.signinWithGoogle()}
            />
            <Button
              icon={true}
              variant="github"
              text="Continue with GitHub"
              handleClick={() => auth?.signinWithGitHub()}
            />
          </>
        )}
      </div>
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
      <LinkGithub />
    </div>
  );
}
