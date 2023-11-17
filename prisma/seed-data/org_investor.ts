import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

export async function create_org_investors() {
  await prisma.organizationInvestors.create({
    data: {
      organizationId: 1,
      investorId: 1,
    },
  });
  await prisma.organizationInvestors.create({
    data: {
      organizationId: 1,
      investorId: 2,
    },
  });
  await prisma.organizationInvestors.create({
    data: {
      organizationId: 1,
      investorId: 3,
    },
  });

  await prisma.organizationInvestors.create({
    data: {
      organizationId: 2,
      investorId: 4,
    },
  });
  await prisma.organizationInvestors.create({
    data: {
      organizationId: 2,
      investorId: 5,
    },
  });
  await prisma.organizationInvestors.create({
    data: {
      organizationId: 2,
      investorId: 6,
    },
  });

  await prisma.organizationInvestors.create({
    data: {
      organizationId: 3,
      investorId: 7,
    },
  });
  await prisma.organizationInvestors.create({
    data: {
      organizationId: 3,
      investorId: 8,
    },
  });
  await prisma.organizationInvestors.create({
    data: {
      organizationId: 3,
      investorId: 9,
    },
  });

  await prisma.organizationInvestors.create({
    data: {
      organizationId: 4,
      investorId: 10,
    },
  });
  await prisma.organizationInvestors.create({
    data: {
      organizationId: 4,
      investorId: 11,
    },
  });
  await prisma.organizationInvestors.create({
    data: {
      organizationId: 4,
      investorId: 12,
    },
  });

  await prisma.organizationInvestors.create({
    data: {
      organizationId: 5,
      investorId: 13,
    },
  });
  await prisma.organizationInvestors.create({
    data: {
      organizationId: 5,
      investorId: 14,
    },
  });
  await prisma.organizationInvestors.create({
    data: {
      organizationId: 5,
      investorId: 15,
    },
  });
  await prisma.organizationInvestors.create({
    data: {
      organizationId: 6,
      investorId: 16,
    },
  });
  await prisma.organizationInvestors.create({
    data: {
      organizationId: 6,
      investorId: 17,
    },
  });
  await prisma.organizationInvestors.create({
    data: {
      organizationId: 6,
      investorId: 1,
    },
  });
  await prisma.organizationInvestors.create({
    data: {
      organizationId: 7,
      investorId: 2,
    },
  });
  await prisma.organizationInvestors.create({
    data: {
      organizationId: 7,
      investorId: 3,
    },
  });
  await prisma.organizationInvestors.create({
    data: {
      organizationId: 7,
      investorId: 4,
    },
  });

  console.log(`organization investors records created`);
}
