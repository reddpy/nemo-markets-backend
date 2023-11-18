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

  const investor_map = investor_list.map((investor_str) => {
    return {
      name: investor_str,
    };
  });

  await prisma.investor.createMany({
    data: [...investor_map],
  });

  console.log(`investor records created`);
}
