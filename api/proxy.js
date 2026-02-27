export default async function handler(req, res) {
    const { path = "" } = req.query;
  
    const url = `https://api.angular-email.com/${path}`;
  
    // Forward cookies from browser to upstream API
    const upstreamHeaders = {
      "content-type": req.headers["content-type"] || "application/json",
      "cookie": req.headers.cookie || ""
    };
  
    // Read body (Vercel gives body already parsed sometimes)
    const body =
      req.method === "GET" || req.method === "HEAD"
        ? undefined
        : typeof req.body === "string"
          ? req.body
          : JSON.stringify(req.body ?? {});
  
    const upstreamResp = await fetch(url, {
      method: req.method,
      headers: upstreamHeaders,
      body
    });
  
    // Pass through status
    res.status(upstreamResp.status);
  
    // If upstream sets cookies, re-set them on YOUR domain
    const setCookie = upstreamResp.headers.get("set-cookie");
    if (setCookie) {
      // Important: set cookie for current domain so browser stores it
      // Also ensure SameSite=None; Secure for HTTPS deployments
      const rewritten = setCookie
        .replace(/Domain=[^;]+;?/gi, "")
        .replace(/SameSite=Lax/gi, "SameSite=None")
        .replace(/SameSite=Strict/gi, "SameSite=None")
        .includes("Secure")
        ? setCookie
        : setCookie + "; Secure";
  
      res.setHeader("set-cookie", rewritten);
    }
  
    // Forward content-type
    const contentType = upstreamResp.headers.get("content-type");
    if (contentType) res.setHeader("content-type", contentType);
  
    const text = await upstreamResp.text();
    res.send(text);
  }