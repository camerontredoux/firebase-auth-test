import { useAuth } from "@utils/auth";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";

const Navigation = () => {
  const auth = useAuth();
  const router = useRouter();
  const handleSignout = () => {
    auth?.signout();
    router.push("/");
  };
  return (
    <>
      <nav className="mt-10 mb-10 items-center justify-between flex h-12">
        <div className="flex items-center">tredoux</div>
        <ul className="hidden sm:flex items-center gap-8">
          {auth?.user ? <button onClick={handleSignout}>signout</button> : null}
          <li>
            <Link href="/">
              <a>home</a>
            </Link>
          </li>
          <li>
            <Link href="/dashboard">
              <a>dashboard</a>
            </Link>
          </li>
          {auth?.user ? (
            <li>
              <div className="shadow-md w-8 h-8 rounded-full">
                <Image
                  className="rounded-full"
                  width="96"
                  height="96"
                  src={auth.user.photoURL}
                  alt={
                    auth?.user?.displayName ? auth.user.displayName : "Profile"
                  }
                />
              </div>
            </li>
          ) : null}
        </ul>
        <ul className="flex sm:hidden items-center">
          <li>test</li>
        </ul>
      </nav>
    </>
  );
};

export default Navigation;
