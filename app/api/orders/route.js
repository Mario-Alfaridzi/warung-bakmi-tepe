import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function POST(request) {
  try {
    const body = await request.json();
    console.log('BODY:', body);
    const { customerName, tableNumber, hasPayed, takeaway, totalPrice, orderItems } = body;

    if (
      !customerName ||
      typeof hasPayed !== 'boolean' ||
      typeof takeaway !== 'boolean' ||
      typeof totalPrice !== 'number' ||
      !Array.isArray(orderItems) ||
      orderItems.length === 0 ||
      (!takeaway && typeof tableNumber !== 'number')
    ) {
      console.log('INVALID BODY', {
        customerName,
        tableNumber,
        hasPayed,
        takeaway,
        totalPrice,
        orderItems,
      });

      return new Response(JSON.stringify({ message: 'Data order tidak lengkap' }), { status: 400 });
    }

    const newOrder = await prisma.order.create({
      data: {
        customerName,
        tableNumber,
        hasPayed,
        takeaway,
        status: 'Menunggu',
        totalPrice,
        orderItems: {
          create: orderItems.map((item) => ({
            menuId: item.menuId,
            quantity: item.quantity,
            note: item.note || null,
          })),
        },
      },
      include: {
        orderItems: true,
      },
    });

    return Response.json({ newOrder });
  } catch (error) {
    console.error('Error creating order:', error);
    return new Response(JSON.stringify({ message: 'Terjadi kesalahan saat membuat order' }), {
      status: 500,
    });
  }
}

export async function GET() {
  try {
    const orders = await prisma.order.findMany({
      include: {
        orderItems: {
          include: {
            menu: true,
          },
        },
      },
      orderBy: {
        orderTime: 'desc',
      },
    });

    return Response.json(orders);
  } catch (error) {
    console.error('Error fetching orders:', error);
    return new Response(
      JSON.stringify({
        message: 'Terjadi kesalahan saat mengambil data order',
      }),
      { status: 500 }
    );
  }
}

export async function DELETE() {
  try {
    await prisma.orderItem.deleteMany();
    await prisma.order.deleteMany();

    return Response.json({ message: 'Berhasil menghapus data' }).status(204);
  } catch (error) {
    console.error('Error delete data:', error);
    return new Response(
      JSON.stringify({
        message: 'Terjadi kesalahan saat menghapus data',
      }),
      { status: 500 }
    );
  }
}
