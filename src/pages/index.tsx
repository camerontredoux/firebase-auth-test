import Button from "@/components/Button";
import { useAuth } from "@/utils/auth";
import Head from "next/head";
import Link from "next/link";

export const LinkGithub = () => {
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

export async function fetcher<JSON = any>(
  input: RequestInfo,
  init?: RequestInit
): Promise<JSON> {
  const res = await fetch(input, init);
  return res.json();
}
export default function Home() {
  const auth = useAuth();

  return (
    <div className="flex-1 flex flex-col gap-5 items-center justify-center py-10">
      <Head>
        <title>Cameron Tredoux's Portfolio</title>
        <link rel="icon" href="/favicon.ico" />
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
        <meta
          name="description"
          content="Cameron Tredoux's Portfolio for Software Engineering."
        />
      </Head>

      <div className="flex flex-col gap-2">
        <Link href="/sitemap">
          <a>Sitemap</a>
        </Link>
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
    </div>
  );
}
