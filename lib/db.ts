import { PrismaClient } from "@/lib/generated/prisma";


const globalForPrisma = globalThis as unknown as {
  prisma: PrismaClient | undefined;
};

export const db =
  globalForPrisma.prisma ??
  new PrismaClient({
    log: ["query", "error", "warn"], // opcional, pero útil para debug
  });

if (process.env.NODE_ENV !== "production") globalForPrisma.prisma = db;
