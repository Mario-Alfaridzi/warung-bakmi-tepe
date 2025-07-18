// prisma/scripts/resetData.js
import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

async function resetData() {
  try {
    console.log("🔁 Menghapus semua data...");

    // Hapus relasi dulu (OrderItem tergantung Order & Menu)
    await prisma.orderItem.deleteMany();
    await prisma.order.deleteMany();
    await prisma.menu.deleteMany();

    console.log(
      "✅ Semua data berhasil dihapus dari Menu, Order, dan OrderItem."
    );
  } catch (err) {
    console.error("❌ Gagal menghapus data:", err);
  } finally {
    await prisma.$disconnect();
  }
}

resetData();
