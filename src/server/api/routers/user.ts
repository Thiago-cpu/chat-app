import { z } from "zod";
import { TRPCError } from "@trpc/server";

import { createTRPCRouter, publicProcedure } from "@/server/api/trpc";
import { hash } from "bcrypt";

export const userRouter = createTRPCRouter({
  register: publicProcedure
    .input(z.object({ email: z.string(), password: z.string() }))
    .output(
      z.object({
        id: z.string().nullable(),
        email: z.string().nullable(),
      })
    )
    .mutation(async ({ input, ctx }) => {
      const existUser = await ctx.prisma.user.findUnique({
        where: {
          email: input.email,
        },
      });
      if (existUser)
        throw new TRPCError({
          code: "CONFLICT",
          message: "Email is already in use",
        });
      const user = await ctx.prisma.user.create({
        data: {
          email: input.email,
          password: await hash(input.password, 12),
        },
      });
      return { email: user.email, id: user.id };
    }),
});
