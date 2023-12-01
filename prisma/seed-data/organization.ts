import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();
type Org = {
  name: string;
  about: string;
  stage: "Seed" | "Enterprise" | "Post-Seed";
  headquarters:
    | "New York, NY"
    | "San Francisco, CA"
    | "Los Angeles, CA"
    | "Seattle, WA"
    | "Boston, MA"
    | "Atlanta, GA"
    | "Miami, FL"
    | "Chicago, IL"
    | "Other";
  year_founded: string;
  org_logo_url: string;
  status: "Sunsetting" | "Bankruptcy" | "Licensing";
  sector:
    | "FinTech"
    | "AI"
    | "Consumer"
    | "Healthcare"
    | "B2B SaaS"
    | "E-Commerce"
    | "Crypto/Web3"
    | "Defense"
    | "Education"
    | "Developer Tools"
    | "Industrial";
};
type OrgList = Org[];

export async function create_organization_data() {
  const organization_data_list: OrgList = [
    {
      name: "Algofi",
      about:
        "Algofi Technologies is a a builder of decentralized blockchain infrastructure. Started by John Clarke and Owen Colgrove, two ex-Citadel. The team has spent 2 years building and launching a decentralized exchange, lending protocol and the first nativer stablecoin on the Algorand blockchain. In addition to this the team prototypes an ambitious Blockchain SDK for decentralized applications (a Cosmos Competitor) which was never launched. ",
      stage: "Seed",
      headquarters: "New York, NY",
      year_founded: "2021",
      org_logo_url: "",
      status: "Sunsetting",
      sector: "Crypto/Web3",
    },
    {
      name: "FTX",
      about:
        'FTX Trading Ltd., commonly known as FTX (short for "Futures Exchange"),[5] is a bankrupt company that formerly operated a fraud-ridden cryptocurrency exchange and crypto hedge fund.[6][7] The exchange was founded in 2019 by Sam Bankman-Fried and Gary Wang. At its peak in July 2021, the company had over one million users and was the third-largest cryptocurrency exchange by volume.[8][9] FTX is incorporated in Antigua and Barbuda and headquartered in the Bahamas.[10] FTX is closely associated with FTX.US, a separate exchange available to US residents.',
      stage: "Post-Seed",
      headquarters: "Other",
      year_founded: "2019",
      org_logo_url: "",
      status: "Bankruptcy",
      sector: "Crypto/Web3",
    },
    {
      name: "Olive AI",
      about:
        "Olive is a developer of an artificial intelligence workforce, automated revenue cycle and claims management for the healthcare industry.",
      stage: "Post-Seed",
      headquarters: "Other",
      year_founded: "2012",
      org_logo_url: "",
      status: "Bankruptcy",
      sector: "Healthcare",
    },
    {
      name: "Argo AI",
      about:
        "Argo AI builds software, hardware, maps, and cloud-support infrastructure for self-driving vehicles.",
      stage: "Enterprise",
      headquarters: "Other",
      year_founded: "2016",
      org_logo_url: "",
      status: "Sunsetting",
      sector: "AI",
    },
    {
      name: "Wyre",
      about:
        "Wyre ceased operations in 2023. Wyre provides a cryptocurrency exchange and technology platform. The platform offers payments for cryptocurrency applications, payout infrastructure, and more. Wyre was formerly known as snapCard. It was founded in 2013 and is based in San Francisco, California.",
      stage: "Post-Seed",
      headquarters: "San Francisco, CA",
      year_founded: "2013",
      org_logo_url: "",
      status: "Sunsetting",
      sector: "FinTech",
    },

    {
      name: "Kite",
      about:
        "Kite is an e-commerce company. It helps businesses across e-commerce, social, and retail. The company focuses on AI and the API economy to build a modern technology stack that drives manufacturing, supply chain, design, product development, and customer acquisition. Kite was founded in 2022 and is based in San Francisco.California.",
      stage: "Post-Seed",
      headquarters: "San Francisco, CA",
      year_founded: "2022",
      org_logo_url: "",
      status: "Sunsetting",
      sector: "Developer Tools",
    },
    {
      name: "Periscope",
      about:
        "Periscope provides a live video streaming platform for Android and iOS. Its application enables users to broadcast and stream live video with location or topic. It was founded in 2014 and is based in San Francisco, California. In March 2015, Periscope was acquired by Twitter. Periscope ceased operations.",
      stage: "Post-Seed",
      headquarters: "San Francisco, CA",
      year_founded: "2014",
      org_logo_url: "",
      status: "Sunsetting",
      sector: "Consumer",
    },
  ];

  await prisma.organization.createMany({
    data: [...organization_data_list],
  });

  console.log(`organization records created`);
}
