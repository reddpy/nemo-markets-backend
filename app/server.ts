import { PrismaClient } from "@prisma/client";
import Fastify from "fastify";
import { USDollar } from "./utils/currency";

const prisma = new PrismaClient();

const fastify = Fastify({
  logger: true,
});

fastify.get("/marketplace", async function handler(request, reply) {
  //default case
  //TODO: add active listed flag to portfolio
  //TODO: add active listed flag to portfolio asset? maybe(talk to cody)
  const portfolios = await prisma.portfolio.findMany({
    include: {
      organization: {
        select: {
          status: true,
          sector: true,
          name: true,
          OrganizationInvestors: {
            select: {
              investor: true,
            },
          },
        },
      },
      assets: true,
    },
  });

  const constructed_payload = portfolios.map((portfolio_obj) => {
    return {
      id: portfolio_obj.id,
      display_url: portfolio_obj.display_img_url
        ? portfolio_obj.display_img_url
        : "https://www.logo.wine/a/logo/WeWork/WeWork-Logo.wine.svg",
      description: portfolio_obj.description,
      portfolio_price: USDollar.format(
        portfolio_obj.assets.reduce(
          (asking_price, currentValue) =>
            asking_price + currentValue.asking_price,
          0
        )
      ),
      asset_count: portfolio_obj.assets.length,
      asset_types: [
        ...new Set(
          portfolio_obj.assets.map((asset) => {
            return asset.category;
          })
        ),
      ],
      status: portfolio_obj.organization.status,
      investors: portfolio_obj.organization.OrganizationInvestors.map(
        (investor_obj) => {
          return investor_obj.investor.name;
        }
      ),
      sector: portfolio_obj.organization.sector,
      company_name: portfolio_obj.organization.name,
    };
  });

  return { portfolios: constructed_payload };
});

async function startServer() {
  try {
    await fastify.listen({ port: 4000 });
  } catch (err) {
    fastify.log.error(err);
    process.exit(1);
  }
}

startServer();
