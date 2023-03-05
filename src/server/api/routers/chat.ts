import { z } from "zod";
import { createTRPCRouter } from "@/server/api/trpc";
import { protectedProcedure } from "../trpc";
import { infinityInput } from "@/utils/input";

export const chatRouterInput = {
  add: z.object({ name: z.string(), description: z.string() }),
};

export const chatRouter = createTRPCRouter({
  add: protectedProcedure
    .input(chatRouterInput.add)
    .output(
      z.object({
        id: z.string().nullable(),
        name: z.string().nullable(),
        description: z.string().nullable(),
      })
    )
    .mutation(async ({ input, ctx }) => {
      const chat = await ctx.prisma.chat.create({
        data: {
          name: input.name,
          description: input.description,
        },
      });

      return chat;
    }),
  infiniteList: protectedProcedure
    .input(infinityInput)
    .query(async ({ input, ctx }) => {
      const limit = input.limit ?? 50;
      const { cursor } = input;
      const items = await ctx.prisma.chat.findMany({
        take: limit + 1, // get an extra item at the end which we'll use as next cursor
        where: {
          name: {
            contains: input.q,
          },
        },
        cursor: cursor ? { id: cursor } : undefined,
        orderBy: {
          name: "asc",
        },
      });
      let nextCursor: typeof cursor | undefined = undefined;
      if (items.length > limit) {
        const nextItem = items.pop();
        nextCursor = nextItem?.id;
      }
      return {
        items,
        nextCursor,
      };
    }),
});
