import { trpc } from "@/utils/trpc";
import { Post } from "@prisma/client";
import React from "react";

interface AboutProps {
  posts: Post[];
}

// export const getStaticProps: GetStaticProps = async () => {

//   return {
//     props: {
//       posts,
//     },
//     revalidate: 10,
//   };
// };

const About: React.FC<AboutProps> = () => {
  // const { data, error } = useSWR<Post[]>("/api/posts", fetcher);

  const { data, isLoading } = trpc.useQuery(["getPosts"]);
  if (isLoading) {
    return <div>Loading...</div>;
  }
  if (data) {
    return (
      <div>
        {data.map((p) => (
          <div key={p.id}>
            {p.title} - {p.content}
          </div>
        ))}
      </div>
    );
  }
  return <div>Error</div>;
};

export default About;
