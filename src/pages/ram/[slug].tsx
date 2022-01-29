import RAMCard from "@/components/RAMCard";
import { Character } from "@/utils/Character";
import { GetServerSideProps } from "next";
import React from "react";

interface SlugProps {
  results: Character;
}

const Slug: React.FC<SlugProps> = ({ results }) => {
  return (
    <>
      <RAMCard c={results} />
    </>
  );
};

export const getServerSideProps: GetServerSideProps = async ({ params }) => {
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
