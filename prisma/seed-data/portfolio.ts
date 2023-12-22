import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();
type Portfolio = {
  display_img_url: string;
  description: string;
  organizationId: number;
  unique_portfolio_id: string;
  key_metrics_json: KeyMetric[];
  listed: boolean;
};

type KeyMetric = {
  header: string;
  value: string;
};

type PortfolioList = Portfolio[];

export async function create_portfolio_data() {
  const portfolio_data_list: PortfolioList = [
    {
      //Algofi
      display_img_url:
        "https://s3-us-west-2.amazonaws.com/cbi-image-service-prd/original/f8dfd5ed-855a-48da-93e0-e4c2878f56e8.png",
      description: "Decentralized Blockchain Infrastructure",
      organizationId: 1,
      unique_portfolio_id: "algofi",
      key_metrics_json: [
        {
          header: "Daily Active Users",
          value: "4,297",
        },
        {
          header: "Total Volume",
          value: "$100M+",
        },
        {
          header: "Estimated Revenue",
          value: "$180,000",
        },
      ],
      listed: true,
    },
    {
      //Olive AI
      display_img_url:
        "https://www.hfma.org/wp-content/uploads/2022/10/olivesponsorslogo-newdark.png?resize=1024,337",
      description: "Healthcare Automation and Intelligence Software",
      organizationId: 3,
      unique_portfolio_id: "olive-ai",
      key_metrics_json: [],
      listed: false,
    },
  ];

  await prisma.portfolio.createMany({
    data: [...portfolio_data_list],
  });

  console.log(`portfolio records created`);
}
