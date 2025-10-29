import { PrismaClient } from "../generated/prisma/client.js";

const prisma = new PrismaClient()

// recheck prisma client work?
// prisma.$queryRaw`SHOW TABLES`.then(result=>console.log(result))

export default prisma;