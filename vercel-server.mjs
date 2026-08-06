// Vercel-compatible production server
// Uses the TanStack Start build output with a standard Node.js HTTP server
import { createServer } from "node:http";
import { readFile } from "node:fs/promises";
import { join, extname } from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = fileURLToPath(new URL(".", import.meta.url));
const CLIENT_DIR = join(__dirname, "dist", "client");

// Import the TanStack Start fetch handler
const handler = await import("./dist/server/server.js");

const MIME_TYPES = {
  ".html": "text/html",
  ".css": "text/css",
  ".js": "application/javascript",
  ".mjs": "application/javascript",
  ".json": "application/json",
  ".png": "image/png",
  ".jpg": "image/jpeg",
  ".jpeg": "image/jpeg",
  ".svg": "image/svg+xml",
  ".ico": "image/x-icon",
  ".mp3": "audio/mpeg",
  ".mp4": "video/mp4",
  ".webp": "image/webp",
  ".woff": "font/woff",
  ".woff2": "font/woff2",
  ".webmanifest": "application/manifest+json",
  ".xml": "application/xml",
  ".txt": "text/plain",
};

const server = createServer(async (req, res) => {
  try {
    const url = new URL(req.url, `http://${req.headers.host || "localhost"}`);
    const pathname = url.pathname;

    // Serve the Android project zip
    if (pathname === "/download/android-project.zip") {
      try {
        const zip = await readFile("/home/team/shared/android-project.zip");
        res.writeHead(200, {
          "Content-Type": "application/zip",
          "Content-Disposition":
            'attachment; filename="vitality-compass-android-project.zip"',
          "Content-Length": zip.length,
        });
        res.end(zip);
        return;
      } catch {
        res.writeHead(404);
        res.end("Download not available");
        return;
      }
    }

    // Try static file first
    if (pathname !== "/") {
      try {
        const filePath = join(CLIENT_DIR, pathname);
        const data = await readFile(filePath);
        const ext = extname(pathname).toLowerCase();
        const contentType = MIME_TYPES[ext] || "application/octet-stream";
        res.writeHead(200, { "Content-Type": contentType });
        res.end(data);
        return;
      } catch {
        // File not found, fall through to SSR
      }
    }

    // SSR fallback
    const response = await handler.fetch(req);
    res.writeHead(
      response.status,
      Object.fromEntries(response.headers.entries())
    );
    if (response.body) {
      const reader = response.body.getReader();
      const pump = async () => {
        while (true) {
          const { done, value } = await reader.read();
          if (done) break;
          res.write(value);
        }
        res.end();
      };
      await pump();
    } else {
      res.end();
    }
  } catch (err) {
    console.error("Server error:", err);
    res.writeHead(500);
    res.end("Internal Server Error");
  }
});

const PORT = process.env.PORT || 3000;
server.listen(PORT, () => {
  console.log(`Vercel server listening on port ${PORT}`);
});

export default server;
