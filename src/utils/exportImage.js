import html2canvas from "html2canvas";

export async function exportNodeAsPng(node, filename) {
  if (!node) return;
  const canvas = await html2canvas(node, {
    backgroundColor: null,
    scale: 2,
    useCORS: true,
    logging: false
  });
  const link = document.createElement("a");
  link.download = filename;
  link.href = canvas.toDataURL("image/png");
  link.click();
}
