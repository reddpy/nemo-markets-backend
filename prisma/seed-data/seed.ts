import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

import { create_investor_data } from "./investor";
import { create_organization_data } from "./organization";
import { create_org_investors } from "./org_investor";
import { create_portfolio_data } from "./portfolio";
import { create_portfolio_asset_data } from "./portfolio_assets";

async function main() {
  await create_investor_data();
  await new Promise((r) => setTimeout(r, 5000));
  await create_organization_data();
  await new Promise((r) => setTimeout(r, 5000));
  await create_org_investors();
  await new Promise((r) => setTimeout(r, 5000));
  await create_portfolio_data();
  await new Promise((r) => setTimeout(r, 5000));
  await create_portfolio_asset_data();
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
