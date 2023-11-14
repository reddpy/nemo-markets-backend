import Fastify from "fastify";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

const fastify = Fastify({
  logger: true,
});

fastify.get("/marketplace", async function handler(request, reply) {
  //default case
  const portfolios = await prisma.portfolio.findMany({
    include: {
      organization: {
        include: {
          OrganizationInvestors: {
            select: { investor: true },
          },
        },
      },
    },
  });

  return { portfolios };
});

async function startServer() {
  try {
    await fastify.listen({ port: 3000 });
  } catch (err) {
    fastify.log.error(err);
    process.exit(1);
  }
}

startServer();
