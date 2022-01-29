import RAMCard from "@/components/RAMCard";
import { Character } from "@/utils/Character";
import { GetStaticPaths, GetStaticProps } from "next";
import { useRouter } from "next/router";
import React from "react";

interface SlugProps {
  results: Character;
}

const Slug: React.FC<SlugProps> = ({ results }) => {
  const router = useRouter();

  return router.isFallback ? (
    <>
      <RAMCard c={results} />
    </>
  ) : (
    <>
      <RAMCard c={results} />
      <div>
        Appears in{" "}
        {results.episode.length > 1
          ? results.episode.length + " episodes"
          : "1 episode"}
      </div>
    </>
  );
};

export const getStaticPaths: GetStaticPaths = async () => {
  return {
    paths: [{ params: { slug: "1" } }],
    fallback: true,
  };
};

export const getStaticProps: GetStaticProps = async ({ params }) => {
  const data = await fetch(
    `https://rickandmortyapi.com/api/character/${params!.slug}`
  );
  const results = await data.json();

  return {
    props: {
      results,
    },
  };
};

export default Slug;
