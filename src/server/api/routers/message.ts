import { createTRPCRouter } from "@/server/api/trpc";
import { protectedProcedure } from "../trpc";
import { infinityInput } from "@/utils/input";
import { z } from "zod";

export const messageRouter = createTRPCRouter({
  infiniteList: protectedProcedure
    .input(infinityInput)
    .input(
      z.object({
        chatId: z.string(),
      })
    )
    .query(async ({ input, ctx }) => {
      const limit = input.limit;
      const { cursor } = input;
      const items = await ctx.prisma.message.findMany({
        take: limit + 1,
        where: {
          body: {
            contains: input.q,
          },
          chatId: input.chatId,
        },
        include: {
          user: {
            select: {
              image: true,
              name: true,
              email: true,
            },
          },
        },
        cursor: cursor ? { id: cursor } : undefined,
        orderBy: {
          createdAt: "desc",
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
