import Link from "next/link";
import React from "react";

interface SitemapProps {}

const Sitemap: React.FC<SitemapProps> = () => {
  return (
    <div className="flex flex-1 flex-col justify-center">
      <ul className="flex flex-col items-center gap-5">
        <li>
          <Link href="/">Home</Link>
        </li>
        <li>
          <Link href="/dashboard">Dashboard</Link>
        </li>
        <li>
          <Link href="/post">Post</Link>
        </li>
        <li>
          <Link href="/about">About</Link>
        </li>
        <li>
          <Link href="/ram">Rick and Morty</Link>
        </li>
      </ul>
    </div>
  );
};

export default Sitemap;
