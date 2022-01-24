import { useAuth } from "@utils/auth";
import Image from "next/image";

const Avatar = () => {
  const auth = useAuth();

  return (
    <>
      {auth?.user ? (
        <div className="shadow-md w-8 h-8 rounded-full">
          <Image
            className="rounded-full"
            width="96"
            height="96"
            src={auth.user.photoURL}
            alt={auth.user.displayName}
          />
        </div>
      ) : null}
    </>
  );
};

export default Avatar;
