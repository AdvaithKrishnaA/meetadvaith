import fs from "fs/promises";
import path from "path";
import sharp from "sharp";

/**
 * CONFIG
 */
const IMAGE_EXTS = [".png", ".jpg", ".jpeg"];
const TEXT_EXTS = [".html", ".js", ".ts", ".jsx", ".tsx", ".css", ".md", ".mdx"];

/**
 * CLI ARGS
 */
const IMAGE_DIR = process.argv[2];
const REF_DIRS = process.argv.slice(3);

if (!IMAGE_DIR || REF_DIRS.length === 0) {
  console.error(
    "❌ Usage: node image-to-webp.mjs <image-folder> <ref-folder...>"
  );
  process.exit(1);
}

/**
 * Helpers
 */
const isImage = (file) =>
  IMAGE_EXTS.includes(path.extname(file).toLowerCase());

const isTextFile = (file) =>
  TEXT_EXTS.includes(path.extname(file).toLowerCase());

async function walk(dir) {
  const entries = await fs.readdir(dir, { withFileTypes: true });
  const files = [];

  for (const entry of entries) {
    const fullPath = path.join(dir, entry.name);
    if (entry.isDirectory()) {
      files.push(...(await walk(fullPath)));
    } else {
      files.push(fullPath);
    }
  }
  return files;
}

/**
 * 1️⃣ Convert images → webp
 */
async function convertImages(imageFiles) {
  const convertedNames = new Set();

  for (const file of imageFiles) {
    if (!isImage(file)) continue;

    const webpFile = file.replace(/\.(png|jpg|jpeg)$/i, ".webp");

    try {
      await fs.access(webpFile);
    } catch {
      await sharp(file)
        .webp({ quality: 80 })
        .toFile(webpFile);

      console.log(`✅ ${path.relative(process.cwd(), file)} → .webp`);
    }

    convertedNames.add(path.basename(file));
  }

  return convertedNames;
}

/**
 * 2️⃣ Update references everywhere
 *
 * Strategy:
 * - Replace only the EXTENSION
 * - Only if the image name exists in converted set
 * - Works for relative / absolute / css / js strings
 */
async function updateReferences(refFiles, convertedNames) {
  const extRegex = /\.(png|jpg|jpeg)(["')])/gi;

  for (const file of refFiles) {
    if (!isTextFile(file)) continue;

    let content = await fs.readFile(file, "utf-8");

    const updated = content.replace(extRegex, (match, ext, suffix, offset) => {
      // Extract filename backwards
      const before = content.slice(0, offset);
      const matchName = before.split(/\/|\\/).pop();

      return convertedNames.has(matchName + "." + ext.toLowerCase())
        ? `.webp${suffix}`
        : match;
    });

    if (updated !== content) {
      await fs.writeFile(file, updated);
      console.log(`🔁 Updated refs in ${path.relative(process.cwd(), file)}`);
    }
  }
}

/**
 * 🚀 Run
 */
const imageFiles = await walk(path.resolve(IMAGE_DIR));
const convertedNames = await convertImages(imageFiles);

for (const dir of REF_DIRS) {
  const refFiles = await walk(path.resolve(dir));
  await updateReferences(refFiles, convertedNames);
}

console.log("\n🎉 Done: images converted & references updated");
