import Button from "@/components/Button";
import RAMCard from "@/components/RAMCard";
import { CharacterType } from "@/utils/CharacterType";
import Cookies from "js-cookie";
import { GetServerSideProps } from "next/types";
import { parseCookies } from "nookies";
import React, { useEffect, useState } from "react";
import {
  HiChevronDoubleLeft,
  HiChevronDoubleRight,
  HiChevronLeft,
  HiChevronRight,
} from "react-icons/hi";
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
      if (data.info.prev) {
        setIndex((i) => i - 1);
      }
    } else if (direction === "next") {
      if (data.info.next) {
        setIndex((i) => i + 1);
      }
    } else if (direction === "first") {
      setIndex(1);
    } else if (direction === "last") {
      setIndex(data.info.pages);
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
          handleClick={() => handleClick("first")}
        >
          <HiChevronDoubleLeft />
        </Button>
        <Button
          variant="github"
          className={`${
            index === 1 ? "cursor-not-allowed opacity-30" : "opacity-100"
          }`}
          handleClick={() => handleClick("prev")}
        >
          <HiChevronLeft />
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
          <HiChevronRight />
        </Button>
        <Button
          variant="github"
          className={`${
            index === data.info.pages
              ? "cursor-not-allowed opacity-30"
              : "opacity-100"
          }`}
          handleClick={() => handleClick("last")}
        >
          <HiChevronDoubleRight />
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
          handleClick={() => handleClick("first")}
        >
          <HiChevronDoubleLeft />
        </Button>
        <Button
          variant="github"
          className={`${
            index === 1 ? "cursor-not-allowed opacity-30" : "opacity-100"
          }`}
          handleClick={() => handleClick("prev")}
        >
          <HiChevronLeft />
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
          <HiChevronRight />
        </Button>
        <Button
          variant="github"
          className={`${
            index === data.info.pages
              ? "cursor-not-allowed opacity-30"
              : "opacity-100"
          }`}
          handleClick={() => handleClick("last")}
        >
          <HiChevronDoubleRight />
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
