import { useAuth } from "@/utils/auth";
import { useRouter } from "next/router";
import React, { Dispatch, SetStateAction } from "react";

type Props = {
  children: React.ReactChild;
  onClick?: () => void;
};

const DropdownItem = (props: Props) => {
  return (
    <>
      <a
        onClick={props.onClick}
        href="#"
        className="w-full text-center transition-color ease-in duration-75 hover:bg-gray-100 p-2"
      >
        {props.children}
      </a>
    </>
  );
};

interface DropdownProps {
  children?: React.ReactChild;
  setOpen: Dispatch<SetStateAction<boolean>>;
}

const Dropdown: React.FC<DropdownProps> = ({ setOpen }) => {
  const auth = useAuth();
  const router = useRouter();
  const handleSignout = () => {
    if (auth) {
      auth.signout();
      router.push("/");
      setOpen(false);
    }
  };
  return (
    <>
      <div className="shadow-sm flex flex-col items-center justify-center overflow-hidden absolute top-24 bg-white rounded-md">
        <DropdownItem onClick={() => handleSignout()}>signout</DropdownItem>
        <DropdownItem>link</DropdownItem>
      </div>
    </>
  );
};

export default Dropdown;
