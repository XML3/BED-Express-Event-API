import { PrismaClient } from "@prisma/client";

// Fixes the following warning:
// warn(prisma-client) Already 10 Prisma Clients are actively running
let prisma;

if (process.env.NODE_ENV === "production") {
  prisma = new PrismaClient();
} else {
  if (!global.prisma) {
    global.prisma = new PrismaClient();
  }
  prisma = global.prisma;
}

export default prisma;
