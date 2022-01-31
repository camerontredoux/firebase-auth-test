import Button from "@/components/Button";
import RAMCard from "@/components/RAMCard";
import { CharacterType } from "@/utils/CharacterType";
import { GetServerSideProps } from "next/types";
import React, { useState } from "react";
import useSWR, { SWRConfig } from "swr";

const fetcher = async (input: RequestInfo, init: RequestInit) =>
  await fetch(input, init).then((res) => res.json());

const Rickandmorty = () => {
  const [index, setIndex] = useState(1);
  const { data } = useSWR<CharacterType>(
    `https://rickandmortyapi.com/api/character?page=${index}`,
    fetcher
  );

  const handleClick = (direction: string) => {
    if (direction === "prev") {
      if (data?.info.prev) {
        setIndex((i) => i - 1);
      }
    } else if (direction === "next") {
      if (data?.info.next) {
        setIndex((i) => i + 1);
      }
    }
  };

  return (
    <>
      <ul className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {data?.results.map((c) => (
          <RAMCard key={c.id} c={c} />
        ))}
      </ul>
      <div className="flex items-center justify-center mt-10 gap-2">
        <Button
          variant="github"
          className={`${
            index === 1 ? "opacity-30 cursor-not-allowed" : "opacity-100"
          }`}
          handleClick={() => handleClick("prev")}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-5 w-5"
            viewBox="0 0 20 20"
            fill="currentColor"
          >
            <path
              fillRule="evenodd"
              d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z"
              clipRule="evenodd"
            />
          </svg>
        </Button>
        <Button variant="github" handleClick={() => handleClick("next")}>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-5 w-5"
            viewBox="0 0 20 20"
            fill="currentColor"
          >
            <path
              fillRule="evenodd"
              d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z"
              clipRule="evenodd"
            />
          </svg>
        </Button>
      </div>
    </>
  );
};

export const getServerSideProps: GetServerSideProps = async () => {
  const data = await fetch("https://rickandmortyapi.com/api/character");
  const results = await data.json();
  return {
    props: {
      fallback: {
        results,
      },
    },
  };
};

interface PageProps {
  fallback: CharacterType[];
}

const Page: React.FC<PageProps> = ({ fallback }) => {
  return (
    <SWRConfig value={{ fallback }}>
      <Rickandmorty />
    </SWRConfig>
  );
};

export default Page;
