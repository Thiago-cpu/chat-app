import { faker } from "@faker-js/faker";
import { type PrismaClient } from "@prisma/client";

export default async function UserSeeder(prisma: PrismaClient) {
  const count = await prisma.user.count();
  const length = 10 - count;
  if (length < 1) return;
  const arr = Array(length)
    .fill(0)
    .map((_, index) => index + 1);

  const promises = arr.map(() => {
    return () =>
      prisma.user.create({
        data: {
          name: faker.name.fullName(),
          image: faker.image.avatar(),
          email: faker.internet.email(),
          createdAt: faker.date.past(),
        },
      });
  });
  return await Promise.all(promises.map((promise) => promise()));
}
