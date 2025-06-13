import { Pool } from "@neondatabase/serverless";
import { PrismaNeon } from "@prisma/adapter-neon";
import { PrismaClient } from "@prisma/client";

const prismaClientSingleton = () => {
  // Get DATABASE_URL from environment (Replit Secrets or .env)
  const databaseUrl = process.env.DATABASE_URL;
  
  console.log('Database URL check:', databaseUrl ? 'Found' : 'Not found');
  
  if (databaseUrl) {
    // For Neon database connections
    if (databaseUrl.includes('neon.tech') || databaseUrl.includes('pooler')) {
      try {
        const neon = new Pool({ connectionString: databaseUrl });
        const adapter = new PrismaNeon({ pool: neon });
        return new PrismaClient({ adapter });
      } catch (error) {
        console.error('Error creating Neon adapter:', error);
        // Fallback to direct connection
        return new PrismaClient({
          datasources: {
            db: {
              url: databaseUrl,
            },
          },
        });
      }
    } else {
      // Standard PostgreSQL connection
      return new PrismaClient({
        datasources: {
          db: {
            url: databaseUrl,
          },
        },
      });
    }
  }
  
  // If no DATABASE_URL is found, throw error
  throw new Error('DATABASE_URL environment variable is required but not found. Please set it in Replit Secrets.');
};

declare global {
  var prismaGlobal: undefined | ReturnType<typeof prismaClientSingleton>;
}

const prisma = globalThis.prismaGlobal ?? prismaClientSingleton();

export default prisma;

if (process.env.NODE_ENV !== "production") globalThis.prismaGlobal = prisma;

