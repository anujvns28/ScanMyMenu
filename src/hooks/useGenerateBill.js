import { jsPDF } from "jspdf";
import logo from "../assets/scanMenuLogo.png";

export const useGenerateBill = () => {

  const generateBill = (items, shopName) => {

    const doc = new jsPDF();

    // LOGO
    doc.addImage(logo, "PNG", 10, 10, 30, 20);

    // SHOP NAME
    doc.setFontSize(20);
    doc.text(shopName, 105, 15, { align: "center" });

    // TITLE
    doc.setFontSize(14);
    doc.text("Invoice", 105, 25, { align: "center" });

    // DATE
    const date = new Date().toLocaleString();
    doc.setFontSize(10);
    doc.text(`Date: ${date}`, 150, 35);

    // LINE
    doc.line(10, 40, 200, 40);

    // TABLE HEADER
    let startY = 50;

    doc.setFontSize(12);
    doc.setFont(undefined, "bold");

    doc.text("Item", 15, startY);
    doc.text("Qty", 110, startY);
    doc.text("Price", 140, startY);
    doc.text("Total", 170, startY);

    doc.setFont(undefined, "normal");

    startY += 8;

    doc.line(10, startY, 200, startY);

    startY += 8;

    let grandTotal = 0;

    items.forEach((item) => {

      const total = item.price * item.qty;
      grandTotal += total;

      doc.text(item.name, 15, startY);
      doc.text(String(item.qty), 110, startY);
      doc.text(`₹${item.price}`, 140, startY);
      doc.text(`₹${total}`, 170, startY);

      startY += 10;
    });

    // LINE BEFORE TOTAL
    doc.line(10, startY, 200, startY);

    startY += 10;

    // GRAND TOTAL
    doc.setFontSize(14);
    doc.setFont(undefined, "bold");

    doc.text(`Grand Total: ₹${grandTotal}`, 140, startY);

    // FOOTER
    startY += 20;

    doc.setFontSize(10);
    doc.setFont(undefined, "normal");

    doc.text("Thank you for visiting!", 105, startY, { align: "center" });
    doc.text("Powered by ScanMyMenu", 105, startY + 6, { align: "center" });

    doc.save(`${shopName}-Bill.pdf`);
  };

  return { generateBill };
};