import RAMCard from "@/components/RAMCard";
import { CharacterType } from "@/utils/CharacterType";
import { GetServerSideProps } from "next";
import React from "react";

interface RickandmortyProps {
  results: CharacterType;
}

const Rickandmorty: React.FC<RickandmortyProps> = ({ results }) => {
  const characters = results.results;

  return (
    <ul className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
      {characters && characters.map((c) => <RAMCard key={c.id} c={c} />)}
    </ul>
  );
};

export const getServerSideProps: GetServerSideProps = async () => {
  const data = await fetch("https://rickandmortyapi.com/api/character");
  const results = await data.json();
  return {
    props: {
      results,
    },
  };
};

export default Rickandmorty;
