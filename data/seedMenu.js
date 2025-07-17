import prisma from "../lib/prisma.js";

async function main() {
  console.log("Start seeding...");

  // 1. Hapus data lama
  console.log("Deleting old data...");
  await prisma.orderItem.deleteMany();
  await prisma.order.deleteMany();
  await prisma.menu.deleteMany();

  // 2. Tambah menu
  const nasiGoreng = await prisma.menu.create({
    data: {
      name: "Nasi Goreng",
      price: 20000,
      type: "food",
      image:
        "https://asset.kompas.com/crops/U6YxhTLF-vrjgM8PN3RYTHlIxfM=/84x60:882x592/1200x800/data/photo/2021/11/17/61949959e07d3.jpg",
      available: true,
    },
  });

  const esTeh = await prisma.menu.create({
    data: {
      name: "Es Teh",
      price: 5000,
      type: "drink",
      image:
        "https://tribratanews.ntb.polri.go.id/wp-content/uploads/2024/10/Image-21.jpg",
      available: true,
    },
  });

  console.log("Seeding finished.");
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
