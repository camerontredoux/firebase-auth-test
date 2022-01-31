import RAMCard from "@/components/RAMCard";
import { CharacterType } from "@/utils/CharacterType";
import { GetStaticProps } from "next";
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

  return (
    <>
      <ul className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {data?.results.map((c) => (
          <RAMCard key={c.id} c={c} />
        ))}
      </ul>
      <div className="flex items-center justify-center mt-4 gap-2">
        <button
          className="rounded-md p-2 bg-slate-400"
          onClick={() => setIndex((i) => i + 1)}
        >
          Next Page
        </button>
        <button
          className="rounded-md p-2 bg-slate-400"
          onClick={() => setIndex((i) => (i > 1 ? i - 1 : i))}
        >
          Previous Page
        </button>
      </div>
    </>
  );
};

export const getStaticProps: GetStaticProps = async () => {
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
