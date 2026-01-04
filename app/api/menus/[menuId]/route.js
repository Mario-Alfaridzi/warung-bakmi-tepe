import prisma from '@/lib/prisma';

export async function PUT(request, { params }) {
  try {
    const { menuId } = await params;
    const body = await request.json();

    const updatedMenu = await prisma.menu.update({
      where: { menuId: parseInt(menuId) },
      data: body,
    });

    return Response.json(updatedMenu);
  } catch (error) {
    return Response.json({ error: error.message }, { status: 500 });
  }
}

export async function DELETE(request, { params }) {
  try {
    const { menuId } = params;

    const deleted = await prisma.menu.delete({
      where: { menuId: parseInt(menuId) },
    });

    return Response.json(deleted);
  } catch (error) {
    return Response.json({ error: error.message }, { status: 500 });
  }
}
