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
      organizationId: 3,
    },
  ];

  await prisma.portfolio.createMany({
    data: [...portfolio_data_list],
  });

  console.log(`portfolio records created`);
}
