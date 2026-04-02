// build.ts
import tailwind from "bun-plugin-tailwind";

// Read the flags passed from the package.json scripts
const args = process.argv.slice(2);
const isMinify = args.includes("--minify");
const isProd = args.includes("--production");

// React relies on NODE_ENV to strip out dev tools in production
if (isProd) {
    process.env.NODE_ENV = "production";
}

console.log(`🔨 Building frontend... (Minify: ${isMinify || isProd}, Prod: ${isProd})`);

const result = await Bun.build({
    entrypoints: ["./public/index.html"],
    outdir: "./public/dist",
    publicPath: "/",
    plugins: [tailwind],
    minify: isMinify || isProd, // Always minify if in prod
    sourcemap: isProd ? "none" : "external",
    define: {
        // Hardcode the environment variable into the compiled React code
        "process.env.NODE_ENV": JSON.stringify(isProd ? "production" : "development"),
    }
});

if (result.success) {
    console.log("✅ Frontend build complete! 🚀");
} else {
    console.error("❌ Build failed:");
    console.error(result.logs);
    process.exit(1); // Ensure the CI/CD pipeline stops if the build fails
}