import prisma from "@/lib/prisma";

export async function PUT(request, { params }) {
  try {
    const { id } = params;
    const body = await request.json();

    const updatedMenu = await prisma.menu.update({
      where: { id: parseInt(id) },
      data: body,
    });

    return Response.json(updatedMenu);
  } catch (error) {
    return Response.json({ error: error.message }, { status: 500 });
  }
}

export async function DELETE(request, { params }) {
  try {
    const { id } = params;

    const deleted = await prisma.menu.delete({
      where: { id: parseInt(id) },
    });

    return Response.json(deleted);
  } catch (error) {
    return Response.json({ error: error.message }, { status: 500 });
  }
}
