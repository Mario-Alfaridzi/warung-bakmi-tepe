import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function PUT(request, { params }) {
  const { id } = params;
  const body = await request.json();

  try {
    const {
      customer_name,
      table_number,
      has_payed,
      takeaway,
      status,
      total_price,
      order_list,
    } = body;

    if (
      !customer_name ||
      typeof table_number !== "number" ||
      typeof has_payed !== "boolean" ||
      typeof takeaway !== "boolean" ||
      typeof total_price !== "number" ||
      !Array.isArray(order_list)
    ) {
      return new Response(JSON.stringify({ message: "Data tidak valid" }), {
        status: 400,
      });
    }

    await prisma.orderItem.deleteMany({
      where: { orderId: parseInt(id) },
    });

    const updatedOrder = await prisma.order.update({
      where: { id: parseInt(id) },
      data: {
        customer_name,
        table_number,
        has_payed,
        takeaway,
        status,
        total_price,
        order_list: {
          create: order_list.map((item) => ({
            menuId: item.menuId || item.id,
            quantity: item.quantity,
          })),
        },
      },
      include: {
        order_list: {
          include: { menu: true },
        },
      },
    });

    return Response.json(updatedOrder);
  } catch (error) {
    console.error("Error updating order:", error);
    return new Response(JSON.stringify({ message: "Gagal mengupdate order" }), {
      status: 500,
    });
  }
}

export async function DELETE(request, { params }) {
  const { id } = params;

  try {
    await prisma.orderItem.deleteMany({
      where: { orderId: parseInt(id) },
    });

    await prisma.order.delete({
      where: { id: parseInt(id) },
    });

    return Response.json({ message: "Order berhasil dihapus" });
  } catch (error) {
    console.error("Error deleting order:", error);
    return new Response(JSON.stringify({ message: "Gagal menghapus order" }), {
      status: 500,
    });
  }
}
