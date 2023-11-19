import { PrismaClient } from "@prisma/client";
import Fastify, { FastifyReply, FastifyRequest } from "fastify";
import { USDollar } from "./utils/currency";

const prisma = new PrismaClient();

const fastify = Fastify({
  logger: true,
});

fastify.get(
  "/portfolio/:portfolio_unique_id",
  async function handler(
    request: FastifyRequest<{ Params: { portfolio_unique_id: string } }>,
    reply: FastifyReply
  ) {
    const portfolio_unique_id = request.params["portfolio_unique_id"];
    console.log("portfolio Id", portfolio_unique_id);

    const portfolio = await prisma.portfolio.findFirst({
      where: { id: 1 }, //TODO: search by unique profile ID added later
      include: {
        organization: {
          select: {
            status: true,
            sector: true,
            name: true,
            about: true,
            stage: true,
            headquarters: true,
            year_founded: true,
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

    const display_url = portfolio?.display_img_url
      ? portfolio.display_img_url
      : "https://www.logo.wine/a/logo/WeWork/WeWork-Logo.wine.svg";

    const portfolio_pricing = portfolio!.assets.reduce(
      (asking_price, currentValue) => asking_price + currentValue.asking_price,
      0
    );

    const asset_types_list = [
      ...new Set(
        portfolio!.assets.map((asset) => {
          return asset.category;
        })
      ),
    ];

    const investor_str_list = portfolio?.organization.OrganizationInvestors.map(
      (investor_obj) => {
        return investor_obj.investor.name;
      }
    );

    const constructed_payload = await {
      id: portfolio?.id,
      display_url: display_url,
      description: portfolio?.description,
      company_about: portfolio?.organization.about,
      portfolio_price: USDollar.format(portfolio_pricing),
      portfolio_price_numeric: portfolio_pricing,
      asset_count: portfolio!.assets.length,
      asset_types: asset_types_list,
      status: portfolio?.organization.status,
      investors: investor_str_list,
      sector: portfolio?.organization.sector,
      company_name: portfolio?.organization.name,
      assets: portfolio?.assets,
      stage: portfolio?.organization.stage,
      headquarters: portfolio?.organization.headquarters,
      year_founded: portfolio?.organization.year_founded,
    };

    return constructed_payload;
  }
);

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
