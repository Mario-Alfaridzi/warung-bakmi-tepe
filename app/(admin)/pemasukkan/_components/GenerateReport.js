import ExcelJS from "exceljs";
import FileSaver from "file-saver";
import moment from "moment";

export const handleExportToExcel = async (filteredOrder, totalRevenue) => {
  const workbook = new ExcelJS.Workbook();
  const worksheet = workbook.addWorksheet("Laporan Pemasukan");

  worksheet.columns = [
    { width: 5 },
    { width: 15 },
    { width: 35 },
    { width: 45 },
    { width: 20 },
    { width: 20 },
  ];

  worksheet.addRow([]);
  const titleRow = worksheet.addRow(["Laporan Pemasukkan"]);

  titleRow.font = {
    name: "Arial",
    size: 18,
    bold: true,
    color: { argb: "FF002060" },
  };
  titleRow.alignment = { horizontal: "center" };
  worksheet.mergeCells(`A${titleRow.number}`, `F${titleRow.number}`);

  const subtitleRow = worksheet.addRow(["Warung Bakmi Tepe"]);
  subtitleRow.font = { name: "Arial", size: 12, bold: true };
  subtitleRow.alignment = { horizontal: "center" };
  worksheet.mergeCells(`A${subtitleRow.number}`, `F${subtitleRow.number}`);

  const dateRow = worksheet.addRow([
    `Dicetak pada: ${moment().format("D MMMM YYYY, HH:mm")}`,
  ]);
  dateRow.font = { name: "Arial", size: 10 };
  dateRow.alignment = { horizontal: "center" };
  worksheet.mergeCells(`A${dateRow.number}`, `F${dateRow.number}`);
  worksheet.addRow([]);

  const headerRow = worksheet.addRow([
    "No",
    "Tanggal",
    "Nama Pemesan",
    "Menu Dipesan",
    "Tipe Pesanan",
    "Pemasukkan",
  ]);
  headerRow.eachCell((cell) => {
    cell.fill = {
      type: "pattern",
      pattern: "solid",
      fgColor: { argb: "FF4472C4" },
    };
    cell.font = {
      name: "Arial",
      size: 12,
      bold: true,
      color: { argb: "FFFFFFFF" },
    };
    cell.alignment = { horizontal: "center", vertical: "middle" };
    cell.border = {
      top: { style: "thin" },
      left: { style: "thin" },
      bottom: { style: "thin" },
      right: { style: "thin" },
    };
  });

  filteredOrder.forEach((item, index) => {
    const menuItems = item.order_list
      .map(
        (orderItem) =>
          `• ${orderItem.menu?.name || "N/A"} (x${orderItem.quantity})`
      )
      .join("\n");

    const rowData = [
      index + 1,
      moment(item.order_time).format("D MMM YYYY"),
      item.customer_name,
      menuItems,
      item.takeaway ? "Take Away" : "Dine In",
      item.total_price,
    ];
    const row = worksheet.addRow(rowData);

    row.getCell("A").alignment = { vertical: "middle", horizontal: "center" };
    row.getCell("B").alignment = { vertical: "middle", horizontal: "center" };
    row.getCell("C").alignment = { vertical: "middle" };
    row.getCell("D").alignment = { vertical: "middle", wrapText: true };
    row.getCell("E").alignment = { vertical: "middle", horizontal: "center" };
    row.getCell("F").alignment = { vertical: "middle", horizontal: "right" };
    row.getCell("F").numFmt = '"Rp"#,##0';

    if (index % 2 === 1) {
      row.eachCell({ includeEmpty: true }, (cell) => {
        cell.fill = {
          type: "pattern",
          pattern: "solid",
          fgColor: { argb: "FFD9E1F2" },
        };
      });
    }
    row.eachCell({ includeEmpty: true }, (cell) => {
      cell.border = {
        top: { style: "thin" },
        left: { style: "thin" },
        bottom: { style: "thin" },
        right: { style: "thin" },
      };
    });
  });

  worksheet.addRow([]);
  const footerRow = worksheet.addRow([
    "",
    "",
    "",
    "",
    "Total Pemasukkan",
    totalRevenue,
  ]);
  worksheet.mergeCells(`A${footerRow.number}`, `D${footerRow.number}`);

  const totalLabelCell = footerRow.getCell("E");
  totalLabelCell.font = { name: "Arial", size: 12, bold: true };
  totalLabelCell.alignment = { horizontal: "right" };

  const totalValueCell = footerRow.getCell("F");

  totalValueCell.fill = {
    type: "pattern",
    pattern: "solid",
    fgColor: { argb: "FF4472C4" },
  };
  totalValueCell.font = {
    name: "Arial",
    size: 12,
    bold: true,
    color: { argb: "FFFFFFFF" },
  };
  totalValueCell.alignment = { horizontal: "right" };
  totalValueCell.numFmt = '"Rp"#,##0';

  footerRow.eachCell({ includeEmpty: true }, (cell) => {
    cell.border = {
      top: { style: "thin" },
      left: { style: "thin" },
      bottom: { style: "thin" },
      right: { style: "thin" },
    };
  });

  workbook.xlsx.writeBuffer().then((buffer) => {
    const blob = new Blob([buffer], {
      type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
    });
    const fileName = `Laporan-Pemasukan-Bakmitepe-${moment().format(
      "YYYYMMDD-HHmmss"
    )}.xlsx`;
    FileSaver.saveAs(blob, fileName);
  });
};
