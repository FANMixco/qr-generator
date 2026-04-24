const canvas = document.getElementById("qrCanvas");

function generateQR() {
  const url = document.getElementById("urlInput").value.trim();
  const downloads = document.getElementById("downloads");
  const downloadPng = document.getElementById("downloadPng");
  const downloadJpg = document.getElementById("downloadJpg");

  if (!url) {
    alert("Please enter a link.");
    return;
  }

  QRCode.toCanvas(
    canvas,
    url,
    {
      width: 300,
      margin: 2,
      color: {
        dark: "#000000",
        light: "#00000000",
      },
    },
    function (error) {
      if (error) {
        alert("Could not generate QR code.");
        return;
      }

      downloadPng.href = canvas.toDataURL("image/png");
      downloadPng.download = "qr-code.png";

      downloadJpg.href = createJpgWithWhiteBackground(canvas);
      downloadJpg.download = "qr-code.jpg";

      downloads.style.display = "block";
    },
  );
}

function createJpgWithWhiteBackground(sourceCanvas) {
  const jpgCanvas = document.createElement("canvas");
  const ctx = jpgCanvas.getContext("2d");

  jpgCanvas.width = sourceCanvas.width;
  jpgCanvas.height = sourceCanvas.height;

  ctx.fillStyle = "#ffffff";
  ctx.fillRect(0, 0, jpgCanvas.width, jpgCanvas.height);
  ctx.drawImage(sourceCanvas, 0, 0);

  return jpgCanvas.toDataURL("image/jpeg", 0.95);
}

document.getElementById("year").textContent = new Date().getFullYear();