import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function PUT(request, { params }) {
  const { orderId } = await params;
  const body = await request.json();

  try {
    const { customerName, tableNumber, hasPayed, takeaway, status, totalPrice, orderItems } = body;

    if (
      !customerName ||
      typeof tableNumber !== 'number' ||
      typeof hasPayed !== 'boolean' ||
      typeof takeaway !== 'boolean' ||
      typeof totalPrice !== 'number' ||
      !Array.isArray(orderItems)
    ) {
      return new Response(JSON.stringify({ message: 'Data tidak valid' }), {
        status: 400,
      });
    }

    await prisma.orderItem.deleteMany({
      where: { orderId: parseInt(orderId) },
    });

    const updatedOrder = await prisma.order.update({
      where: { orderId: parseInt(orderId) },
      data: {
        customerName,
        tableNumber,
        hasPayed,
        takeaway,
        status,
        totalPrice,
        orderItems: {
          create: orderItems.map((item) => ({
            menuId: item.menuId || item.menuId,
            quantity: item.quantity,
          })),
        },
      },
      include: {
        orderItems: {
          include: { menu: true },
        },
      },
    });

    return Response.json(updatedOrder);
  } catch (error) {
    console.error('Error updating order:', error);
    return new Response(JSON.stringify({ message: 'Gagal mengupdate order' }), {
      status: 500,
    });
  }
}

export async function DELETE(request, { params }) {
  const { orderId } = params;

  try {
    await prisma.orderItem.deleteMany({
      where: { orderId: parseInt(orderId) },
    });

    await prisma.order.delete({
      where: { orderId: parseInt(orderId) },
    });

    return Response.json({ message: 'Order berhasil dihapus' });
  } catch (error) {
    console.error('Error deleting order:', error);
    return new Response(JSON.stringify({ message: 'Gagal menghapus order' }), {
      status: 500,
    });
  }
}
