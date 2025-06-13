import { Pool } from "@neondatabase/serverless";
import { PrismaNeon } from "@prisma/adapter-neon";
import { PrismaClient } from "@prisma/client";

const prismaClientSingleton = () => {
  // Check if we have DATABASE_URL for direct connection or use Neon adapter
  if (process.env.DATABASE_URL && !process.env.DATABASE_URL.includes('neon')) {
    // Direct PostgreSQL connection (for Replit)
    return new PrismaClient({
      datasources: {
        db: {
          url: process.env.DATABASE_URL,
        },
      },
    });
  } else if (process.env.POSTGRES_PRISMA_URL) {
    // Neon connection with adapter
    const neon = new Pool({ connectionString: process.env.POSTGRES_PRISMA_URL });
    const adapter = new PrismaNeon({ pool: neon });
    return new PrismaClient({ adapter });
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

