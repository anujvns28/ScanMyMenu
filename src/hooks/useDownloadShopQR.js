import QRCode from "qrcode";
import scanMyMenuLogo from "../assets/scanMenuLogo.png";

export const useDownloadShopQR = () => {
  const generateAndDownloadQR = async ({
    shopId,
    shopName = "My Shop",
    shopImage,
  }) => {
    try {
      if (!shopId) throw new Error("Shop ID is required");

      const menuUrl = `https://scanmymenu.vercel.app/menu/${shopId}`;

      /* ===== QR ===== */
      const qrDataUrl = await QRCode.toDataURL(menuUrl, {
        width: 500,
        margin: 1,
      });

      /* ===== CANVAS ===== */
      const canvas = document.createElement("canvas");
      const ctx = canvas.getContext("2d");

      canvas.width = 800;
      canvas.height = 1100;

      // background
      ctx.fillStyle = "#ffffff";
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      /* ===== BRAND LOGO ===== */
      const brand = new Image();
      brand.src = scanMyMenuLogo;
      await new Promise((r) => (brand.onload = r));
      ctx.drawImage(brand, 300, 30, 200, 80);

      /* ===== SHOP IMAGE ===== */
      if (shopImage) {
        const shopImg = new Image();
        shopImg.crossOrigin = "anonymous";
        shopImg.src = shopImage;

        await new Promise((r) => (shopImg.onload = r));

        const imgSize = 160;
        const imgX = canvas.width / 2 - imgSize / 2;
        const imgY = 140;

        ctx.save();
        ctx.beginPath();
        ctx.moveTo(imgX + 20, imgY);
        ctx.arcTo(imgX + imgSize, imgY, imgX + imgSize, imgY + imgSize, 20);
        ctx.arcTo(
          imgX + imgSize,
          imgY + imgSize,
          imgX,
          imgY + imgSize,
          20
        );
        ctx.arcTo(imgX, imgY + imgSize, imgX, imgY, 20);
        ctx.arcTo(imgX, imgY, imgX + imgSize, imgY, 20);
        ctx.closePath();
        ctx.clip();

        ctx.drawImage(shopImg, imgX, imgY, imgSize, imgSize);
        ctx.restore();
      }

      /* ===== SHOP NAME ===== */
      ctx.textAlign = "center";
      ctx.fillStyle = "#111827";
      ctx.font = "bold 36px Arial";
      ctx.fillText(shopName, canvas.width / 2, 350);

      /* ===== SUB TEXT ===== */
      ctx.font = "20px Arial";
      ctx.fillStyle = "#6b7280";
      ctx.fillText("Scan to view our menu", canvas.width / 2, 390);

      /* ===== QR ===== */
      const qrImg = new Image();
      qrImg.src = qrDataUrl;
      await new Promise((r) => (qrImg.onload = r));
      ctx.drawImage(qrImg, 200, 430, 400, 400);

      /* ===== FOOTER ===== */
      ctx.font = "16px Arial";
      ctx.fillStyle = "#9ca3af";
      ctx.fillText(
        "Powered by ScanMyMenu",
        canvas.width / 2,
        900
      );

      /* ===== DOWNLOAD ===== */
      const finalImage = canvas.toDataURL("image/png");
      const link = document.createElement("a");
      link.href = finalImage;
      link.download = `${shopName.replace(/\s+/g, "_")}_QR.png`;
      link.click();
    } catch (err) {
      console.error("QR generation failed:", err);
    }
  };

  return { generateAndDownloadQR };
};
