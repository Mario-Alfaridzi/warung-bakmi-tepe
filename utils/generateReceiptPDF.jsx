import { jsPDF } from "jspdf";

const generateReceiptPDF = (payload) => {
  const {
    customer_name,
    table_number,
    order_list,
    total_price,
    takeaway,
    cash,
    change,
  } = payload;

  const doc = new jsPDF({
    orientation: "portrait",
    unit: "mm",
    format: [80, 130 + order_list.length * 6],
  });

  let y = 10;

  doc.setFontSize(10);
  doc.text("STRUK PEMESANAN", 20, y);
  y += 6;
  doc.setFontSize(10);
  doc.text("BAKMI TEPE", 28, y);
  y += 6;

  const now = new Date();
  const dateStr = now.toLocaleDateString("id-ID");
  const timeStr = now.toLocaleTimeString("id-ID");
  doc.setFontSize(8);
  doc.text(`${dateStr}   ${timeStr}`, 30, y);
  y += 6;

  doc.setFontSize(9);
  doc.text(
    takeaway ? "Jenis Pesanan : Takeaway" : `Nomor Meja    : ${table_number}`,
    5,
    y
  );
  y += 5;

  if (customer_name) {
    doc.text(`Nama Pelanggan : ${customer_name}`, 5, y);
    y += 5;
  }

  doc.line(5, y, 75, y);
  y += 5;

  doc.setFontSize(9);
  doc.text("QTY", 5, y);
  doc.text("ITEM", 20, y);
  doc.text("PRICE", 60, y);
  y += 5;

  order_list.forEach((item) => {
    const amount = item.price * item.quantity;
    doc.text(String(item.quantity), 5, y);
    doc.text(item.name.slice(0, 20), 20, y);
    doc.text(`Rp ${amount.toLocaleString("id-ID")}`, 70, y, { align: "right" });
    y += 5;
  });

  doc.line(5, y, 75, y);
  y += 5;

  doc.text("Total", 5, y);
  doc.text(`Rp ${total_price.toLocaleString("id-ID")}`, 70, y, {
    align: "right",
  });

  y += 5;

  doc.text("Cash", 5, y);
  doc.text(`Rp ${cash.toLocaleString("id-ID")}`, 70, y, { align: "right" });
  y += 5;

  doc.text("Change", 5, y);
  doc.text(`Rp ${change.toLocaleString("id-ID")}`, 70, y, { align: "right" });
  y += 8;

  doc.setFontSize(10);
  doc.text("THANK YOU!", 25, y);

  doc.save(`struk_pesanan_${Date.now()}.pdf`);
};

export { generateReceiptPDF };
