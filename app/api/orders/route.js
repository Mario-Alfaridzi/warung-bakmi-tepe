import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function POST(request) {
  try {
    const body = await request.json();
    console.log("BODY:", body);
    const {
      customer_name,
      table_number,
      has_payed,
      takeaway,
      total_price,
      order_list,
    } = body;

    if (
      !customer_name ||
      typeof has_payed !== "boolean" ||
      typeof takeaway !== "boolean" ||
      typeof total_price !== "number" ||
      !Array.isArray(order_list) ||
      order_list.length === 0 ||
      (!takeaway && typeof table_number !== "number")
    ) {
      console.log("INVALID BODY", {
        customer_name,
        table_number,
        has_payed,
        takeaway,
        total_price,
        order_list,
      });

      return new Response(
        JSON.stringify({ message: "Data order tidak lengkap" }),
        { status: 400 }
      );
    }

    const newOrder = await prisma.order.create({
      data: {
        customer_name,
        table_number,
        has_payed,
        takeaway,
        status: "Menunggu",
        total_price,
        order_list: {
          create: order_list.map((item) => ({
            menuId: item.id,
            quantity: item.quantity,
            note: item.note || null,
          })),
        },
      },
      include: {
        order_list: true,
      },
    });

    return Response.json({ newOrder });
  } catch (error) {
    console.error("Error creating order:", error);
    return new Response(
      JSON.stringify({ message: "Terjadi kesalahan saat membuat order" }),
      { status: 500 }
    );
  }
}

export async function GET() {
  try {
    const orders = await prisma.order.findMany({
      include: {
        order_list: {
          include: {
            menu: true,
          },
        },
      },
      orderBy: {
        order_time: "desc",
      },
    });

    return Response.json(orders);
  } catch (error) {
    console.error("Error fetching orders:", error);
    return new Response(
      JSON.stringify({
        message: "Terjadi kesalahan saat mengambil data order",
      }),
      { status: 500 }
    );
  }
}

export async function DELETE() {
  try {
    await prisma.orderItem.deleteMany();
    await prisma.order.deleteMany();

    return Response.json({ message: "Berhasil menghapus data" }).status(204);
  } catch (error) {
    console.error("Error delete data:", error);
    return new Response(
      JSON.stringify({
        message: "Terjadi kesalahan saat menghapus data",
      }),
      { status: 500 }
    );
  }
}
