import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

export async function create_investor_data() {
  const investor_list = [
    "Tiger Global",
    "Benchmark",
    "Andressen-Horowitz",
    "Accel Partners",
    "Sequoia Capital",
    "Lightspeed Venture Partners",
    "Index Ventures",
    "Khosla Ventures",
    "SoftBank",
    "First Round Capital",
    "Dorm Room Fund",
    "Hustle Fund",
    "Weekend Fund",
    "Thiel Capital",
    "2048 Ventures",
    "Afore Alpha",
    "Antler",
  ];

  investor_list.map(async (investor) => {
    await prisma.investor.upsert({
      where: {
        name: investor,
      },
      update: {},
      create: {
        name: investor,
      },
    });
  });

  console.log(`investor records created`);
}
