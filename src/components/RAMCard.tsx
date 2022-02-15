import { Character } from "@/utils/Character";
import { Result } from "@/utils/CharacterType";
import Link from "next/link";
import React from "react";

interface RAMCardProps {
  c: Result | Character;
}

const RAMCard: React.FC<RAMCardProps> = ({ c }) => {
  return c ? (
    <li className="custom-shadow flex flex-row items-center justify-around gap-2 overflow-hidden rounded-md bg-white p-4 text-center sm:flex-col">
      <Link passHref href={{ pathname: "/ram/[slug]", query: { slug: c.id } }}>
        <a className="my-image flex w-fit items-center rounded-full shadow-md transition-all duration-75 ease-in hover:scale-110">
          <img src={c.image} className="h-24 w-24 rounded-full" />
        </a>
      </Link>
      <div>
        <div className="mt-2 break-words font-bold sm:w-full">{c.name}</div>
        <div className="break-words text-sm sm:w-full">{c.location.name}</div>
        {c.gender === "Male" && (
          <div className="text-sm text-green-200">{c.gender}</div>
        )}
        {c.gender === "Female" && (
          <div className="text-sm text-red-300">{c.gender}</div>
        )}
        {c.gender === "unknown" && <div className="text-sm">N/A</div>}
      </div>
    </li>
  ) : (
    <li className="custom-shadow flex flex-row items-center justify-center gap-2 overflow-hidden rounded-md bg-white p-4 text-center sm:flex-col">
      <a className="my-image flex w-fit items-center rounded-full shadow-md transition-all duration-75 ease-in hover:scale-110">
        <img src="/" className="h-24 w-24 rounded-full" />
      </a>

      <div className="mt-2 w-24 break-words font-bold sm:w-full">
        Loading...
      </div>
      <div className="w-24 break-words text-sm sm:w-full">Loading...</div>

      <div className="text-sm text-green-200">Loading...</div>
    </li>
  );
};

export default RAMCard;
