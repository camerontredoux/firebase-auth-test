import { createPost } from "@/utils/createPost";
import { createUserTRPC } from "@/utils/createUser";
import * as trpc from "@trpc/server";
import { z } from "zod";

export const appRouter = trpc
  .router()
  .query("getUser", {
    input: z.object({
      id: z.string(),
      username: z.string(),
    }),
    resolve({ input }) {
      console.log(input);

      return {
        id: input.id,
        name: input.username,
      };
    },
  })
  .mutation("createUser", {
    input: z.object({
      id: z.string(),
      username: z.string().min(5),
    }),
    resolve({ input }) {
      return createUserTRPC(input.id, input.username);
    },
  })
  .mutation("createPost", {
    input: z.object({
      title: z.string().min(5),
      content: z.string().min(10),
    }),
    resolve({ input }) {
      return createPost(input);
    },
  });

// export type definition of API
export type AppRouter = typeof appRouter;
