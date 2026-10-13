import fs from "fs";
import path from "path";
import zlib from "zlib";

const routes = [
  { name: "/", manifest: ".next/server/app/page/build-manifest.json" },
  { name: "/about", manifest: ".next/server/app/about/page/build-manifest.json" },
  { name: "/services", manifest: ".next/server/app/services/page/build-manifest.json" },
  { name: "/contact", manifest: ".next/server/app/contact/page/build-manifest.json" },
  { name: "/admin", manifest: ".next/server/app/admin/page/build-manifest.json" },
  { name: "/admin/login", manifest: ".next/server/app/admin/login/page/build-manifest.json" },
];

console.log("=== BUNDLE SIZE AUDIT PER ROUTE ===\n");

routes.forEach((r) => {
  if (!fs.existsSync(r.manifest)) {
    console.log(`Route ${r.name}: manifest not found at ${r.manifest}`);
    return;
  }
  const manifest = JSON.parse(fs.readFileSync(r.manifest, "utf-8"));
  const allFiles = new Set([
    ...(manifest.polyfillFiles || []),
    ...(manifest.rootMainFiles || []),
  ]);

  let totalRawBytes = 0;
  let totalGzipBytes = 0;
  const chunkDetails = [];

  for (const f of allFiles) {
    const filePath = path.join(".next", f);
    if (fs.existsSync(filePath)) {
      const content = fs.readFileSync(filePath);
      const rawBytes = content.length;
      const gzipBytes = zlib.gzipSync(content).length;
      totalRawBytes += rawBytes;
      totalGzipBytes += gzipBytes;
      chunkDetails.push({
        file: f,
        rawKB: (rawBytes / 1024).toFixed(2),
        gzipKB: (gzipBytes / 1024).toFixed(2),
      });
    }
  }

  console.log(`Route: ${r.name}`);
  console.log(`  Total Raw JS: ${(totalRawBytes / 1024).toFixed(2)} KB`);
  console.log(`  Total Gzip JS: ${(totalGzipBytes / 1024).toFixed(2)} KB`);
  console.log("  Chunks:");
  chunkDetails.forEach((c) => {
    console.log(`    - ${c.file}: Raw ${c.rawKB} KB | Gzip ${c.gzipKB} KB`);
  });
  console.log("");
});
