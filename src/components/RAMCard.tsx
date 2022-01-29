import { Result } from "@/utils/CharacterType";
import Image from "next/image";
import React from "react";

interface RAMCardProps {
  c: Result;
}

const RAMCard: React.FC<RAMCardProps> = ({ c }) => {
  return (
    <li className="custom-shadow p-4 flex items-center text-center justify-center flex-row sm:flex-col gap-2 bg-white rounded-md overflow-hidden">
      <a
        href="#"
        className="my-image transition-all ease-in duration-75 hover:scale-110 w-fit rounded-full shadow-md flex items-center"
      >
        <Image
          src={c.image}
          width="100px"
          height="100px"
          className="rounded-full"
        />
      </a>
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
  );
};

export default RAMCard;
