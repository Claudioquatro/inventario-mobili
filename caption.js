// Disegna sotto la foto una fascia con codice, nome, misure e stanza.
// Usato sia dal worker (OffscreenCanvas) sia dalla pagina (canvas normale).
// lines: [titolo, riga misure, ...righe extra]
function captionLayout(w, h, lines) {
  const fs = Math.max(18, Math.round(w / 34));        // dimensione testo
  const pad = Math.round(fs * 0.8);
  const band = pad * 2 + Math.round(fs * 1.25) + (lines.length - 1) * Math.round(fs * 1.3);
  return { fs, pad, band, W: w, H: h + band };
}
function drawCaption(ctx, bmp, lines) {
  const w = bmp.width, h = bmp.height;
  const { fs, pad, band, W, H } = captionLayout(w, h, lines);
  ctx.fillStyle = '#1f2622'; ctx.fillRect(0, 0, W, H);
  ctx.drawImage(bmp, 0, 0, w, h);
  ctx.fillStyle = '#c9774a'; ctx.fillRect(0, h, W, Math.max(4, fs / 6));
  const font = '-apple-system, "Segoe UI", Roboto, Arial, sans-serif';
  const fit = (t, size, weight) => {               // tronca il testo se troppo lungo
    ctx.font = `${weight} ${size}px ${font}`;
    if (ctx.measureText(t).width <= W - pad * 2) return t;
    while (t.length > 3 && ctx.measureText(t + '…').width > W - pad * 2) t = t.slice(0, -1);
    return t + '…';
  };
  let y = h + pad + fs * 1.25 - fs * 0.25;
  ctx.textBaseline = 'alphabetic';
  lines.forEach((t, i) => {
    const size = i === 0 ? Math.round(fs * 1.25) : fs;
    const weight = i <= 1 ? 700 : 400;
    ctx.fillStyle = i === 0 ? '#ffffff' : i === 1 ? '#f2d3bd' : '#cfd6d2';
    ctx.fillText(fit(String(t), size, weight), pad, y);
    y += Math.round(fs * 1.3);
  });
  return { W, H };
}
