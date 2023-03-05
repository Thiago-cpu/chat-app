import { faker } from "@faker-js/faker";
import { type PrismaClient } from "@prisma/client";

export default async function UserSeeder(prisma: PrismaClient) {
  const arr = Array(200)
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
