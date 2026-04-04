// build.ts
import tailwind from "bun-plugin-tailwind";
import { rmSync, readFileSync, writeFileSync } from "node:fs";

// 1. Wipe out old artifacts so public/dist is completely clean!
try { rmSync("./public/dist", { recursive: true, force: true }); } catch (e) {}

const args = process.argv.slice(2);
const isProd = args.includes("--production");
if (isProd) process.env.NODE_ENV = "production";

console.log(`🔨 Building frontend...`);

// 2. Build the TSX directly (NOT the HTML file!)
const result = await Bun.build({
    entrypoints: ["./public/index.tsx"],
    outdir: "./public/dist",
    naming: "[dir]/[name].[ext]", // This forces exactly: index.js and index.css
    plugins: [tailwind],
    minify: isProd,
    sourcemap: isProd ? "none" : "external",
    define: { "process.env.NODE_ENV": JSON.stringify(isProd ? "production" : "development") }
});

if (!result.success) {
    console.error("❌ Build failed:\n", result.logs);
    process.exit(1);
}

// 3. Manually copy the HTML and point it to the predictable JS and CSS files
console.log("📄 Patching index.html for production...");
let html = readFileSync("./public/index.html", "utf-8");
html = html.replace('src="./index.tsx"', 'src="/index.js"');
html = html.replace('</head>', '    <link rel="stylesheet" href="/index.css">\n</head>');
writeFileSync("./public/dist/index.html", html);

console.log("✅ Frontend build complete! 🚀");