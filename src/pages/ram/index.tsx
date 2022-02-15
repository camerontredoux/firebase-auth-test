import Button from "@/components/Button";
import RAMCard from "@/components/RAMCard";
import { CharacterType } from "@/utils/CharacterType";
import Cookies from "js-cookie";
import { GetServerSideProps } from "next/types";
import { parseCookies } from "nookies";
import React, { useEffect, useState } from "react";
import useSWR, { SWRConfig } from "swr";

const fetcher = async (input: RequestInfo, init: RequestInit) =>
  await fetch(input, init).then((res) => res.json());

interface RickandmortyProps {
  pageCookie: string;
}

const Rickandmorty: React.FC<RickandmortyProps> = ({ pageCookie }) => {
  const [index, setIndex] = useState<number>(() => JSON.parse(pageCookie));

  useEffect(() => {
    Cookies.set("index", "" + index);
  }, [index]);

  const { data, error } = useSWR<CharacterType>(
    `https://rickandmortyapi.com/api/character?page=${index}`,
    fetcher
  );

  if (error) return <div>Error...</div>;
  if (!data) return <div>Loading...</div>;

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
      <div className="mb-10 flex items-center justify-center gap-2">
        <Button
          variant="github"
          className={`${
            index === 1 ? "cursor-not-allowed opacity-30" : "opacity-100"
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
        <div>
          {index} of {data.info.pages}
        </div>
        <Button
          variant="github"
          className={`${
            index === data.info.pages
              ? "cursor-not-allowed opacity-30"
              : "opacity-100"
          }`}
          handleClick={() => handleClick("next")}
        >
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
      <ul className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
        {data.results.map((c) => (
          <RAMCard key={c.id} c={c} />
        ))}
      </ul>
      <div className="mt-10 flex items-center justify-center gap-2">
        <Button
          variant="github"
          className={`${
            index === 1 ? "cursor-not-allowed opacity-30" : "opacity-100"
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
        <div>
          {index} of {data.info.pages}
        </div>
        <Button
          variant="github"
          className={`${
            index === data.info.pages
              ? "cursor-not-allowed opacity-30"
              : "opacity-100"
          }`}
          handleClick={() => handleClick("next")}
        >
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

export const getServerSideProps: GetServerSideProps = async (ctx) => {
  const data = await fetch("https://rickandmortyapi.com/api/character");
  const results = await data.json();
  const pageCookie = parseCookies(ctx);
  return {
    props: {
      initialPageCookie: pageCookie.index ? pageCookie.index : "1",
      fallback: {
        results,
      },
    },
  };
};

interface PageProps {
  fallback: CharacterType[];
  initialPageCookie: string;
}

const Page: React.FC<PageProps> = ({ fallback, initialPageCookie }) => {
  return (
    <SWRConfig value={{ fallback, revalidateOnFocus: false }}>
      <Rickandmorty pageCookie={initialPageCookie} />
    </SWRConfig>
  );
};

export default Page;
