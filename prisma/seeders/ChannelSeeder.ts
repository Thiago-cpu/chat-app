import { faker } from "@faker-js/faker";
import { type PrismaClient } from "@prisma/client";

export default async function ChannelSeeder(prisma: PrismaClient) {
  const arr = Array(10)
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
