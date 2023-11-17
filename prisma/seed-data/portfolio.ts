import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();
type Portfolio = {
  display_img_url: string;
  description: string;
  organizationId: number;
};

type PortfolioList = Portfolio[];

export async function create_portfolio_data() {
  const portfolio_data_list: PortfolioList = [
    {
      //Algofi
      display_img_url: "",
      description: "Decentralized Blockchain Infrastructure",
      organizationId: 1,
    },
    {
      //Olive AI
      display_img_url: "",
      description: "Healthcare Automation and Intelligence Software",
      organizationId: 2,
    },
  ];

  portfolio_data_list.map(async (portfolio) => {
    await prisma.portfolio.create({
      data: {
        display_img_url: portfolio.display_img_url,
        description: portfolio.description,
        organizationId: portfolio.organizationId,
      },
    });
  });

  console.log(`portfolio records created`);
}
