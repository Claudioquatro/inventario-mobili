// Elabora le foto in background (decodifica + ridimensionamento + JPEG),
// così l'interfaccia resta fluida mentre si inseriscono le misure.
importScripts('caption.js');

async function scaled(bmp, max, q) {
  const s = Math.min(1, max / Math.max(bmp.width, bmp.height));
  const c = new OffscreenCanvas(Math.round(bmp.width * s), Math.round(bmp.height * s));
  const ctx = c.getContext('2d');
  ctx.imageSmoothingQuality = 'high';
  ctx.drawImage(bmp, 0, 0, c.width, c.height);
  return c.convertToBlob({ type: 'image/jpeg', quality: q });
}
async function annotated(bmp, lines) {
  const { W, H } = captionLayout(bmp.width, bmp.height, lines);
  const c = new OffscreenCanvas(W, H);
  drawCaption(c.getContext('2d'), bmp, lines);
  return c.convertToBlob({ type: 'image/jpeg', quality: 0.85 });
}
self.onmessage = async e => {
  const { id, blob, sizes, caption } = e.data;
  try {
    const bmp = await createImageBitmap(blob, { imageOrientation: 'from-image' });
    const out = [];
    if (caption) out.push(await annotated(bmp, caption));
    else for (const [max, q] of sizes) out.push(await scaled(bmp, max, q));
    bmp.close();
    self.postMessage({ id, out });
  } catch (err) {
    self.postMessage({ id, error: String(err && err.message || err) });
  }
};
