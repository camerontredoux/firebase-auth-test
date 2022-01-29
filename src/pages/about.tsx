import { Post } from "@prisma/client";
import React from "react";

interface AboutProps {
  posts: Post[];
}

const About: React.FC<AboutProps> = () => {
  return <div>Error</div>;
};

export default About;
