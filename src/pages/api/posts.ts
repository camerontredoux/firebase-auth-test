import { NextApiRequest, NextApiResponse } from "next";
import prisma from "prisma";

export default async function handle(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === "GET") {
    const posts = await prisma.post.findMany();
    res.json(posts);
  }
  if (req.method === "POST") {
    const data = req.body;
    const post = await prisma.post.create({
      data: {
        content: data.content,
        title: data.title,
      },
    });
    res.json(post);
  }
}
