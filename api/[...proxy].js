// Catch-all proxy for /api/* — forwards requests to BACKEND_URL
// This lets you host the frontend on Vercel while the backend runs elsewhere.
// Set BACKEND_URL in Vercel dashboard (e.g. https://your-backend.example.com)

module.exports = async (req, res) => {
  try {
    const backend = (process.env.BACKEND_URL || 'http://localhost:5000').replace(/\/$/, '');
    // Preserve the original path and query (req.url includes them)
    const destination = backend + req.url;

    // Read request body for non-GET/HEAD
    let body = undefined;
    if (req.method !== 'GET' && req.method !== 'HEAD') {
      const chunks = [];
      for await (const chunk of req) chunks.push(chunk);
      body = Buffer.concat(chunks);
      if (body.length === 0) body = undefined;
    }

    // Forward headers but remove host to avoid conflicts
    const headers = { ...req.headers };
    delete headers.host;

    const fetchRes = await fetch(destination, {
      method: req.method,
      headers,
      body,
      redirect: 'manual'
    });

    // Copy status and headers
    res.statusCode = fetchRes.status;
    fetchRes.headers.forEach((value, key) => {
      // Vercel may complain about some hop-by-hop headers; skip them
      if (['transfer-encoding', 'content-encoding', 'connection'].includes(key)) return;
      res.setHeader(key, value);
    });

    // Pipe the response body
    const reader = fetchRes.body.getReader();
    const encoder = new TextEncoder();
    while (true) {
      const { done, value } = await reader.read();
      if (done) break;
      res.write(Buffer.from(value));
    }
    res.end();
  } catch (err) {
    console.error('Proxy error:', err);
    res.statusCode = 500;
    res.setHeader('Content-Type', 'application/json');
    res.end(JSON.stringify({ success: false, message: 'Proxy error', error: err.message }));
  }
};
