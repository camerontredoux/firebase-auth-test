import { Character } from "@/utils/Character";
import { Result } from "@/utils/CharacterType";
import Image from "next/image";
import Link from "next/link";
import React from "react";

interface RAMCardProps {
  c: Result | Character;
}

const RAMCard: React.FC<RAMCardProps> = ({ c }) => {
  return c ? (
    <li className="custom-shadow p-4 flex items-center text-center justify-center flex-row sm:flex-col gap-2 bg-white rounded-md overflow-hidden">
      <Link passHref href={{ pathname: "/ram/[slug]", query: { slug: c.id } }}>
        <a className="my-image transition-all ease-in duration-75 hover:scale-110 w-fit rounded-full shadow-md flex items-center">
          <Image
            src={c.image}
            width="100px"
            height="100px"
            className="rounded-full"
          />
        </a>
      </Link>
      <div className="w-24 sm:w-full break-words mt-2 font-bold">{c.name}</div>
      <div className="w-24 sm:w-full break-words text-sm">
        {c.location.name}
      </div>
      {c.gender === "Male" && (
        <div className="text-sm text-green-200">{c.gender}</div>
      )}
      {c.gender === "Female" && (
        <div className="text-sm text-red-300">{c.gender}</div>
      )}
      {c.gender === "unknown" && <div className="text-sm">N/A</div>}
    </li>
  ) : (
    <li className="custom-shadow p-4 flex items-center text-center justify-center flex-row sm:flex-col gap-2 bg-white rounded-md overflow-hidden">
      <a className="my-image transition-all ease-in duration-75 hover:scale-110 w-fit rounded-full shadow-md flex items-center">
        <Image src="/" width="100px" height="100px" className="rounded-full" />
      </a>

      <div className="w-24 sm:w-full break-words mt-2 font-bold">
        Loading...
      </div>
      <div className="w-24 sm:w-full break-words text-sm">Loading...</div>

      <div className="text-sm text-green-200">Loading...</div>
    </li>
  );
};

export default RAMCard;
