import "dotenv/config";
import { PrismaClient } from "./generated/prisma/client";
import { PrismaPg } from "@prisma/adapter-pg";


if( !process.env.DATABASE_URL ) {
    throw new Error("database url not found")
}

const adapter = new PrismaPg({
    connectionString: process.env.DATABASE_URL
})

const prisma = new PrismaClient({
    adapter
})

export { onRampStatus } from "./generated/prisma/enums";
export { prisma };