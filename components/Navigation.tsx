import { useAuth } from "@utils/auth";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import Avatar from "./Avatar";
import Dropdown from "./Dropdown";

const Navigation = () => {
  const auth = useAuth();
  const [open, setOpen] = useState(false);
  const ref = useRef<any>(null);

  useEffect(() => {
    const checkIfClickedOutside = (e: Event) => {
      if (open && ref.current && !ref.current.contains(e.target)) {
        setOpen(false);
      }
    };

    document.addEventListener("mousedown", checkIfClickedOutside);

    return () => {
      document.removeEventListener("mousedown", checkIfClickedOutside);
    };
  }, [open]);

  return (
    <>
      <nav className="mt-10 mb-10 items-center justify-between flex h-12">
        <div className="flex items-center">tredoux</div>
        <ul className="hidden sm:flex items-center gap-8">
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
              <a href="#" onClick={() => setOpen((open) => !open)}>
                <Avatar />
              </a>
              {open && (
                <div ref={ref} className="flex justify-center items-center">
                  <Dropdown setOpen={setOpen} />
                </div>
              )}
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
