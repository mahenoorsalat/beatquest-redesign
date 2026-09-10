import sharp from "sharp";
import fs from "fs";
import path from "path";

async function optimizeFile(inputPath, maxWidth, quality = 85) {
  if (!fs.existsSync(inputPath)) return;
  const initialSize = fs.statSync(inputPath).size;
  const buf = fs.readFileSync(inputPath);
  const meta = await sharp(buf).metadata();
  
  const ext = path.extname(inputPath);
  const webpPath = inputPath.replace(ext, ".webp");
  
  // WebP
  const webpBuffer = await sharp(buf)
    .resize({ width: Math.min(meta.width || maxWidth, maxWidth), withoutEnlargement: true })
    .webp({ quality, effort: 6 })
    .toBuffer();
  fs.writeFileSync(webpPath, webpBuffer);
  
  // PNG replacement (if PNG)
  let finalPngSize = initialSize;
  if (ext.toLowerCase() === ".png") {
    const pngBuffer = await sharp(buf)
      .resize({ width: Math.min(meta.width || maxWidth, maxWidth), withoutEnlargement: true })
      .png({ quality: 85, compressionLevel: 9, effort: 7 })
      .toBuffer();
    fs.writeFileSync(inputPath, pngBuffer);
    finalPngSize = pngBuffer.length;
  }
  
  console.log(`[OPT] ${path.basename(inputPath)}: ${Math.round(initialSize/1024)}KB -> PNG ${Math.round(finalPngSize/1024)}KB | WebP ${Math.round(webpBuffer.length/1024)}KB`);
}

async function run() {
  // clean up any leftover .tmp files
  function cleanTmp(dir) {
    if (!fs.existsSync(dir)) return;
    for (const item of fs.readdirSync(dir)) {
      const full = path.join(dir, item);
      if (fs.statSync(full).isDirectory()) cleanTmp(full);
      else if (item.endsWith(".tmp")) fs.unlinkSync(full);
    }
  }
  cleanTmp("public");

  console.log("--- OPTIMIZING STICKERS ---");
  const stickersDir = "public/stickers";
  if (fs.existsSync(stickersDir)) {
    for (const f of fs.readdirSync(stickersDir)) {
      if (f.endsWith(".png")) {
        await optimizeFile(path.join(stickersDir, f), 600, 85);
      }
    }
  }

  console.log("\n--- OPTIMIZING PRODUCT IMAGES ---");
  const imagesDir = "public/images";
  if (fs.existsSync(imagesDir)) {
    for (const f of fs.readdirSync(imagesDir)) {
      if (f.endsWith(".png")) {
        const isHero = f.includes("bundle");
        await optimizeFile(path.join(imagesDir, f), isHero ? 1400 : 900, 85);
      }
    }
  }

  console.log("\n--- OPTIMIZING __L5E ASSETS ---");
  const l5eDir = "public/__l5e/assets-v1";
  if (fs.existsSync(l5eDir)) {
    for (const dir of fs.readdirSync(l5eDir)) {
      const sub = path.join(l5eDir, dir);
      if (fs.statSync(sub).isDirectory()) {
        for (const f of fs.readdirSync(sub)) {
          if (f.endsWith(".png")) {
            const isHero = f.includes("bundle");
            await optimizeFile(path.join(sub, f), isHero ? 1400 : 900, 85);
          }
        }
      }
    }
  }

  console.log("\n--- OPTIMIZING SRC ASSETS ---");
  const srcAssetsDir = "src/assets";
  if (fs.existsSync(srcAssetsDir)) {
    for (const f of fs.readdirSync(srcAssetsDir)) {
      if (f.endsWith(".png")) {
        const isHero = f.includes("bundle");
        await optimizeFile(path.join(srcAssetsDir, f), isHero ? 1400 : 900, 85);
      }
    }
  }

  console.log("\nAll images optimized successfully!");
}

run().catch(console.error);
