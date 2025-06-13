import { Pool } from "@neondatabase/serverless";
import { PrismaNeon } from "@prisma/adapter-neon";
import { PrismaClient } from "@prisma/client";

const prismaClientSingleton = () => {
  // Use DATABASE_URL from .env file
  if (process.env.DATABASE_URL) {
    // Check if it's a Neon connection string
    if (process.env.DATABASE_URL.includes('neon.tech')) {
      const neon = new Pool({ connectionString: process.env.DATABASE_URL });
      const adapter = new PrismaNeon({ pool: neon });
      return new PrismaClient({ adapter });
    } else {
      // Standard PostgreSQL connection
      return new PrismaClient({
        datasources: {
          db: {
            url: process.env.DATABASE_URL,
          },
        },
      });
    }
  }
  
  // Fallback to standard PrismaClient
  return new PrismaClient();
};

declare global {
  var prismaGlobal: undefined | ReturnType<typeof prismaClientSingleton>;
}

const prisma = globalThis.prismaGlobal ?? prismaClientSingleton();

export default prisma;

if (process.env.NODE_ENV !== "production") globalThis.prismaGlobal = prisma;

