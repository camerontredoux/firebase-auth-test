import { useAuth } from "@/utils/auth";
import anime from "animejs";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import Avatar from "./Avatar";
import Dropdown from "./Dropdown";

const Navigation = () => {
  const auth = useAuth();
  const [open, setOpen] = useState(false);
  const ref = useRef<any>(null);

  useEffect(() => {
    var textWrapper = document.querySelector(".ml11 .letters");
    textWrapper!.innerHTML = textWrapper!.textContent!.replace(
      /([^\x00-\x80]|\w)/g,
      "<span class='letter'>$&</span>"
    );

    anime
      .timeline({ loop: false })
      .add({
        targets: ".ml11 .line",
        scaleY: [0, 1],
        opacity: [0.5, 1],
        easing: "easeOutExpo",
        duration: 700,
      })
      .add({
        targets: ".ml11 .line",
        translateX: [
          0,
          document.querySelector(".ml11 .letters")!.getBoundingClientRect()
            .width + 10,
        ],
        easing: "easeOutExpo",
        duration: 700,
        delay: 100,
      })
      .add({
        targets: ".ml11 .letter",
        opacity: [0, 1],
        easing: "easeOutExpo",
        duration: 600,
        offset: "-=775",
        delay: (_, i) => 34 * (i + 1),
      })
      .add({
        targets: ".line",
        opacity: [1, 0],
        scaleY: [1, 0],
      });
  }, []);

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
    <nav className="my-10 items-center justify-between flex h-12">
      <h1 className="ml11">
        <span className="text-wrapper">
          <span className="line line1"></span>
          <span className="letters">tredoux</span>
        </span>
      </h1>
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
              <div className="flex justify-center items-center">
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
  );
};

export default Navigation;
