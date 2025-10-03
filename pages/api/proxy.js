export default async function handler(req, res) {
  const { url } = req.query;
  if (!url) {
    res.status(400).json({ error: "Missing url parameter" });
    return;
  }
  if (!/^https?:\/\//i.test(url) || /localhost|127\.0\.0\.1|10\.|192\.168/.test(url)) {
    res.status(400).json({ error: "Invalid or blocked url" });
    return;
  }

  try {
    const response = await fetch(url);
    const contentType = response.headers.get("content-type");
    if (contentType) res.setHeader("Content-Type", contentType);
    const buffer = await response.arrayBuffer();
    res.status(response.status).send(Buffer.from(buffer));
  } catch (err) {
    console.error("Proxy error:", err);
    res.status(500).json({ error: "Failed to proxy request" });
  }
}
