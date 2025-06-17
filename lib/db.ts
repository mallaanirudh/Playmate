import { PrismaClient } from '../app/generated/prisma';

declare global {
  // This makes sure TypeScript recognizes the prisma property on globalThis
  var prisma: PrismaClient | undefined;
}

// Create the PrismaClient instance or reuse the existing one
export const db = globalThis.prisma || new PrismaClient();

if (process.env.NODE_ENV !== 'production') {
  globalThis.prisma = db;
}
