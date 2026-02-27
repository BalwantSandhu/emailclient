export default async function handler(req, res) {
    try {
      const rawPath = req.query?.path ?? "";
      const path = Array.isArray(rawPath) ? rawPath.join("/") : rawPath;
      const url = `https://api.angular-email.com/${path}`;
  
      const method = req.method || "GET";
  
      // Forward headers that matter
      const headers = {
        // Forward cookies from the browser to the upstream API
        cookie: req.headers.cookie || "",
        // Forward content-type if present
        "content-type": req.headers["content-type"] || "application/json",
        // Optional: forward accept header
        accept: req.headers.accept || "application/json, text/plain, */*",
      };
  
      // Build body for non-GET/HEAD requests
      let body = undefined;
      if (method !== "GET" && method !== "HEAD") {
        if (typeof req.body === "string") {
          body = req.body;
        } else if (req.body == null) {
          body = undefined;
        } else {
          body = JSON.stringify(req.body);
        }
      }
  
      const upstreamResp = await fetch(url, {
        method,
        headers,
        body,
      });
  
      // Pass status through
      res.status(upstreamResp.status);
  
      // Forward ALL Set-Cookie headers (important: sess + sess.sig)
      const setCookies =
        typeof upstreamResp.headers.getSetCookie === "function"
          ? upstreamResp.headers.getSetCookie()
          : [];
  
      if (setCookies.length > 0) {
        const rewritten = setCookies.map((c) =>
          c
            // Remove Domain attribute so cookies are stored for your Vercel domain
            .replace(/;\s*Domain=[^;]+/gi, "")
            // Ensure cross-site compatible in HTTPS contexts
            .replace(/;\s*SameSite=Lax/gi, "; SameSite=None")
            .replace(/;\s*SameSite=Strict/gi, "; SameSite=None")
        );
  
        res.setHeader("set-cookie", rewritten);
      }
  
      // Forward content-type
      const contentType = upstreamResp.headers.get("content-type");
      if (contentType) res.setHeader("content-type", contentType);
  
      // Read and forward response body
      const text = await upstreamResp.text();
      res.send(text);
    } catch (err) {
      res.status(500).json({
        message: "Proxy error",
        error: err?.message || String(err),
      });
    }
  }