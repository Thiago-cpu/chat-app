import { PrismaClient } from "@prisma/client";
import ChannelSeeder from "./seeders/ChannelSeeder";
import MessageSeeder from "./seeders/MessageSeeder";
import UserSeeder from "./seeders/UserSeeder";
const prisma = new PrismaClient();

async function main() {
  await ChannelSeeder(prisma);
  await UserSeeder(prisma);
  await MessageSeeder(prisma);
}
main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
