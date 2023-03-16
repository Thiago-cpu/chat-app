import { faker } from "@faker-js/faker";
import { type PrismaClient } from "@prisma/client";

export default async function ChannelSeeder(prisma: PrismaClient) {
  const count = await prisma.chat.count();
  const length = 10 - count;
  if (length < 1) return;
  const arr = Array(length)
    .fill(0)
    .map((_, index) => index + 1);

  const promises = arr.map(() => {
    return () =>
      prisma.chat.create({
        data: {
          name: faker.company.name(),
          description: faker.company.catchPhrase(),
          createdAt: faker.date.past(),
        },
      });
  });
  return await Promise.all(promises.map((promise) => promise()));
}
