import { PrismaClient } from "@prisma/client";
import Fastify, { FastifyReply, FastifyRequest } from "fastify";
import { USDollar } from "./utils/currency";
import cors from "@fastify/cors";

const prisma = new PrismaClient();

const fastify = Fastify({
  logger: true,
});

// Enable CORS for specific routes
fastify.register(cors, {
  origin: true, // or set specific origin(s)
});

interface BodyType {
  id?: number;
  asset_name: string;
  asset_category: string;
  asset_stage: string;
  asset_description: string;
  asset_price: number;
}

interface DeleteBody {
  category: string;
  description: string;
  id: number;
  name: string;
  portfolioId: number;
  stage: string;
}

interface ListingUpdate {
  market_listing: boolean;
  portfolio_id: number;
}

fastify.patch(
  "/vault/market-status",
  async function handler(
    request: FastifyRequest<{ Body: ListingUpdate }>,
    reply: FastifyReply,
  ) {
    const asset_to_be_updated = await prisma.portfolio.update({
      where: {
        id: request.body.portfolio_id,
      },
      data: {
        listed: request.body.market_listing,
      },
    });

    console.log("market status updated, fastify", asset_to_be_updated);
  },
);

fastify.post(
  "/vault/asset",
  async function handler(
    request: FastifyRequest<{ Body: BodyType }>,
    reply: FastifyReply,
  ) {
    const new_asset = await prisma.portfolioAssets.create({
      data: {
        name: request.body.asset_name,
        category: request.body.asset_category,
        stage: request.body.asset_stage,
        description: request.body.asset_description,
        asking_price: Number(request.body.asset_price),
        portfolioId: 1, //will have to get by portfolio eventually
      },
    });
    console.log("asset created, fastify", new_asset);
  },
);

fastify.patch(
  "/vault/asset",
  async function handler(
    request: FastifyRequest<{ Body: BodyType }>,
    reply: FastifyReply,
  ) {
    const asset_to_be_updated = await prisma.portfolioAssets.update({
      where: {
        id: request.body.id,
      },
      data: {
        name: request.body.asset_name,
        category: request.body.asset_category,
        stage: request.body.asset_stage,
        description: request.body.asset_description,
        asking_price: request.body.asset_price,
      },
    });

    console.log("asset updated, fastify", asset_to_be_updated);
  },
);

fastify.delete(
  "/vault/asset",
  async function handler(
    request: FastifyRequest<{ Body: DeleteBody }>,
    reply: FastifyReply,
  ) {
    const portfolio = await prisma.portfolio.findUnique({
      where: {
        id: request.body.portfolioId,
      },
      include: {
        assets: true,
      },
    });

    const portfolio_empty: boolean = portfolio!.assets.length - 1 == 0;

    const asset_to_be_deleted = await prisma.portfolioAssets.delete({
      where: {
        id: request.body.id,
      },
    });

    if (portfolio_empty) {
      await prisma.portfolio.update({
        where: {
          id: request.body.portfolioId,
        },
        data: {
          listed: false,
        },
      });
    }

    console.log("asset deleted, fastify", asset_to_be_deleted);
  },
);

fastify.get(
  "/portfolio/:portfolio_unique_id",
  async function handler(
    request: FastifyRequest<{ Params: { portfolio_unique_id: string } }>,
    reply: FastifyReply,
  ) {
    const portfolio_unique_id = request.params["portfolio_unique_id"];
    console.log("portfolio Id", portfolio_unique_id);

    const portfolio = await prisma.portfolio.findFirst({
      where: { unique_portfolio_id: portfolio_unique_id },
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
      0,
    );

    const asset_types_list = [
      ...new Set(
        portfolio!.assets.map((asset) => {
          return asset.category;
        }),
      ),
    ];

    const investor_str_list = portfolio?.organization.OrganizationInvestors.map(
      (investor_obj) => {
        return investor_obj.investor.name;
      },
    );

    const constructed_payload = {
      id: portfolio?.id,
      portfolio_unique_id: portfolio?.unique_portfolio_id,
      key_metrics_json: portfolio?.key_metrics_json,
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
      listed: portfolio?.listed,
    };

    return constructed_payload;
  },
);

fastify.get("/marketplace", async function handler(request, reply) {
  //default case
  //TODO: add active listed flag to portfolio
  //TODO: add active listed flag to portfolio asset? maybe(talk to cody)
  const portfolios = await prisma.portfolio.findMany({
    where: {
      listed: true,
    },
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
      portfolio_unique_id: portfolio_obj.unique_portfolio_id,
      display_url: portfolio_obj.display_img_url
        ? portfolio_obj.display_img_url
        : "https://www.logo.wine/a/logo/WeWork/WeWork-Logo.wine.svg",
      description: portfolio_obj.description,
      portfolio_price: USDollar.format(
        portfolio_obj.assets.reduce(
          (asking_price, currentValue) =>
            asking_price + currentValue.asking_price,
          0,
        ),
      ),
      asset_count: portfolio_obj.assets.length,
      asset_types: [
        ...new Set(
          portfolio_obj.assets.map((asset) => {
            return asset.category;
          }),
        ),
      ],
      status: portfolio_obj.organization.status,
      investors: portfolio_obj.organization.OrganizationInvestors.map(
        (investor_obj) => {
          return investor_obj.investor.name;
        },
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
