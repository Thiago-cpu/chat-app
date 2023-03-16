import { faker } from "@faker-js/faker";
import { type PrismaClient } from "@prisma/client";

export default async function MessageSeeder(prisma: PrismaClient) {
  const arr = Array(1000)
    .fill(0)
    .map((_, index) => index + 1);
  const totalCount = await prisma.user.count();
  const channels = await prisma.chat.findMany({
    select: {
      id: true,
    },
  });

  const promises = channels
    .map(({ id: channelId }) => {
      return arr.map(() => {
        return async () => {
          const randomSkip = Math.floor(Math.random() * totalCount);
          const user = await prisma.user.findFirstOrThrow({
            select: {
              id: true,
            },
            skip: randomSkip,
          });
          return await prisma.message.create({
            data: {
              body: `${faker.lorem.sentences()} ${faker.internet.emoji()}`,
              chatId: channelId,
              userId: user.id,
              createdAt: faker.date.past(),
            },
          });
        };
      });
    })
    .flat();

  return await Promise.all(promises.map((promise) => promise()));
}
