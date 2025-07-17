export async function POST(req) {
  const formData = await req.formData();

  const name = formData.get("name");
  const price = formData.get("price");
  const image = formData.get("image");

  console.log("Menu baru:", { name, price, image });

  // Simulasi sukses
  return Response.json(
    { message: "Menu berhasil ditambahkan!" },
    { status: 200 }
  );
}
