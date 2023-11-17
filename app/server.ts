import { PrismaClient } from "@prisma/client";
import Fastify from "fastify";

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

  let USDollar = new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    minimumFractionDigits: 0,
  });

  //TODO: get asking price by summing portfolio itemized assets
  //TODO: get number of assets
  //TODO: get list of types of assets
  //TODO: get portfolio categories from  assets
  const constructed_payload = portfolios.map((portfolio_obj) => {
    return {
      id: portfolio_obj.id,
      display_url: portfolio_obj.display_img_url
        ? portfolio_obj.display_img_url
        : "https://www.logo.wine/a/logo/WeWork/WeWork-Icon-Logo.wine.svg",
      asking_price: USDollar.format(portfolio_obj.portfolio_price),
      company_name: portfolio_obj.organization.name,
      investors: portfolio_obj.organization.OrganizationInvestors.map(
        (investor_obj) => {
          return investor_obj.investor.name;
        }
      ),
      description: portfolio_obj.description,
      status: portfolio_obj.organization.organizationStatusId,
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
