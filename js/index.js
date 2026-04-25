const canvas = document.getElementById("qrCanvas");

function generateQR() {
  const url = document.getElementById("urlInput").value.trim();
  const downloads = document.getElementById("downloads");
  const downloadPng = document.getElementById("downloadPng");
  const downloadJpg = document.getElementById("downloadJpg");
  const sizeInput = document.getElementById("qrSize");

  let qrSize = parseInt(sizeInput.value, 10);

  if (Number.isNaN(qrSize) || qrSize < 300) {
    qrSize = 300;
    sizeInput.value = 300;
  }

  // ⚠️ warning for large sizes
  if (qrSize > 2048) {
    const newValue = prompt(
      "Recommended maximum size is 2048px for performance reasons.\n\nYou entered: " +
        qrSize +
        "px\n\nYou can adjust it here:",
      qrSize,
    );

    if (newValue === null) {
      // user cancelled → fallback to safe value
      qrSize = 2048;
    } else {
      const parsed = parseInt(newValue, 10);

      if (!Number.isNaN(parsed) && parsed >= 300) {
        qrSize = parsed;
      } else {
        qrSize = 2048;
      }
    }

    sizeInput.value = qrSize;
  }

  if (!url) {
    alert("Please enter a link.");
    return;
  }

  const invert = document.getElementById("invertColors").checked;

  document.querySelector(".qr-box").classList.toggle("inverted-preview", invert);

  QRCode.toCanvas(
    canvas,
    url,
    {
      width: qrSize,
      margin: 2,
      color: {
  dark: invert ? "#ffffff" : "#000000",
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

      downloadJpg.href = createJpgWithBackground(
  canvas,
  invert ? "#000000" : "#ffffff"
);
      downloadJpg.download = "qr-code.jpg";

      downloads.style.display = "block";
    },
  );
}

function createJpgWithBackground(sourceCanvas, backgroundColor) {
  const jpgCanvas = document.createElement("canvas");
  const ctx = jpgCanvas.getContext("2d");

  jpgCanvas.width = sourceCanvas.width;
  jpgCanvas.height = sourceCanvas.height;

  ctx.fillStyle = backgroundColor;
  ctx.fillRect(0, 0, jpgCanvas.width, jpgCanvas.height);
  ctx.drawImage(sourceCanvas, 0, 0);

  return jpgCanvas.toDataURL("image/jpeg", 0.95);
}

document.getElementById("year").textContent = new Date().getFullYear();
