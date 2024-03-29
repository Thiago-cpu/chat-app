import { z } from "zod";
import { TRPCError } from "@trpc/server";

import { createTRPCRouter, publicProcedure } from "@/server/api/trpc";
import { hash } from "bcrypt";
import { protectedProcedure } from "../trpc";
import { infinityInput } from "../../../utils/input";

export const userRouterInput = {
  register: z.object({ email: z.string(), password: z.string() }),
  updateMe: z.object({
    newPassword: z
      .string()
      .optional()
      .transform(async (newPassword) =>
        newPassword ? await hash(newPassword, 12) : undefined
      ),
    name: z.string().optional(),
    bio: z.string().optional(),
  }),
};

export const userRouterOutput = {
  me: z.object({
    id: z.string(),
    bio: z.string().nullable(),
    name: z.string().nullable(),
    email: z.string().nullable(),
    image: z.string().nullable(),
  }),
};

export const userRouter = createTRPCRouter({
  register: publicProcedure
    .input(userRouterInput.register)
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
  me: protectedProcedure.output(userRouterOutput.me).query(async ({ ctx }) => {
    ctx.session.user.id;
    const user = await ctx.prisma.user.findUniqueOrThrow({
      where: {
        id: ctx.session.user.id,
      },
    });

    return user;
  }),
  updateMe: protectedProcedure
    .input(userRouterInput.updateMe)
    .output(userRouterOutput.me)
    .mutation(async ({ input, ctx }) => {
      const user = await ctx.prisma.user.update({
        data: {
          bio: input.bio,
          name: input.name,
          password: input.newPassword,
        },
        where: {
          id: ctx.session.user.id,
        },
      });

      return user;
    }),
  infiniteList: protectedProcedure
    .input(infinityInput)
    .output(
      z.object({
        items: z.array(
          z.object({
            name: z.string().nullable(),
            email: z.string().nullable(),
            image: z.string().nullable(),
          })
        ),
        nextCursor: z.string().optional(),
      })
    )
    .query(async ({ input, ctx }) => {
      const limit = input.limit;
      const { cursor } = input;
      const items = await ctx.prisma.user.findMany({
        take: limit + 1,
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
