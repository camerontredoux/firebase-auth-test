import { trpc } from "@/utils/trpc";
import React from "react";

interface AboutProps {}

const About: React.FC<AboutProps> = () => {
  const q = trpc.useQuery(["getUser", { id: "1", username: "Cameron" }]);

  if (q.isLoading) return <div>Loading...</div>;

  if (q.data) {
    return (
      <div>
        {q.data.id} {q.data.name}
      </div>
    );
  }

  return <div>Error</div>;
};

export default About;
