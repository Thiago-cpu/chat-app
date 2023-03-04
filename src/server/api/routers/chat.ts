import { z } from "zod";
import { createTRPCRouter } from "@/server/api/trpc";
import { protectedProcedure } from "../trpc";

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
});
