import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();
type PortfolioAsset = {
  name: string;
  category: "Software" | "Brand Asset";
  stage: "Live" | "Prototype";
  description: string;
  asking_price: number;
  portfolioId: number;
};

type PortfolioAssetList = PortfolioAsset[];

export async function create_portfolio_asset_data() {
  const portfolio_asset_data_list: PortfolioAssetList = [
    {
      name: "Decentralized Exchange",
      category: "Software",
      stage: "Live",
      description:
        "Codebase for a decentralized exchange built on the Algorand blockchain",
      asking_price: 35000,
      portfolioId: 1, //Algofi
    },
    {
      name: "Lending Protocol",
      category: "Software",
      stage: "Live",
      description:
        "Codebase for a decentralized lending protocol built on the Algorand blockchain",
      asking_price: 25000,
      portfolioId: 1, //Algofi
    },
    {
      name: "Stablecoin Protocol",
      category: "Software",
      stage: "Live",
      description:
        "Codebase for the first native stablecoin deployed t on the Algorand blockchain",
      asking_price: 15000,
      portfolioId: 1, //Algofi
    },
    {
      name: "Blockchain SDK",
      category: "Software",
      stage: "Prototype",
      description:
        "Code for a blockchain SDK for decentralized applications with 1000",
      asking_price: 250000,
      portfolioId: 1, //Algofi
    },
    {
      name: "Orderbook Protocol",
      category: "Software",
      stage: "Prototype",
      description:
        "Code for the flagship app-chain built on aforementioned SDK, an on-chain orderbook DEX ",
      asking_price: 75000,
      portfolioId: 1, //Algofi
    },
    {
      name: "“Algofi” Brand Assets",
      category: "Brand Asset",
      stage: "Live",
      description: "“Algofi” brand assets - Logo, Domain, and Naming Rights ",
      asking_price: 40000,
      portfolioId: 1, //Algofi
    },
    {
      name: "Twitter Account",
      category: "Brand Asset",
      stage: "Live",
      description:
        "Algofi’s Twitter with 24,000+ authentic followers (mostly cyrpto-native builders, researchers, traders, etc..)",
      asking_price: 20000,
      portfolioId: 1, //Algofi
    },
  ];

  await prisma.portfolioAssets.createMany({
    data: [...portfolio_asset_data_list],
  });

  console.log(`portfolio asset records created`);
}
