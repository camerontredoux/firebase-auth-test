import { useAuth } from "@/utils/auth";
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
    <nav className="my-10 flex h-12 items-center justify-between">
      <div>tredoux</div>
      <ul className="hidden items-center gap-8 sm:flex">
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
        <li>
          <Link href="/sitemap">
            <a>sitemap</a>
          </Link>
        </li>
        {auth?.user ? (
          <li ref={ref}>
            <a href="#" onClick={() => setOpen((open) => !open)}>
              <Avatar />
            </a>
            {open && (
              <div className="flex items-center justify-center">
                <Dropdown setOpen={setOpen} />
              </div>
            )}
          </li>
        ) : null}
      </ul>
      <ul className="flex items-center sm:hidden">
        <li>test</li>
      </ul>
    </nav>
  );
};

export default Navigation;
