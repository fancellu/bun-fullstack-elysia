import { Elysia, t } from 'elysia'
import { staticPlugin } from '@elysiajs/static'
import { swagger } from '@elysiajs/swagger'
import { readFile } from 'node:fs/promises'
import { join } from 'node:path'

// Check for NODE_ENV=production OR a --prod CLI flag
const isProd = process.env.NODE_ENV === 'production' || Bun.argv.includes('--prod')
const publicFolder = isProd ? 'public/dist' : 'public'

console.log('\n' + '='.repeat(40))
console.log(`🚀 RUNNING IN ${isProd ? 'PRODUCTION' : 'DEVELOPMENT'} MODE`)
console.log(`📂 Serving frontend from: ./${publicFolder}`)
console.log('='.repeat(40) + '\n')

const app = new Elysia()
    .use(swagger())

// =========================================================
// 🟢 DEVELOPMENT MODE: The Transpiler & Loopback
// =========================================================
if (!isProd) {
    app.onError(({ code, request, set }) => {
        const url = new URL(request.url);

        // 1. Let missing API routes safely fail
        if (url.pathname.startsWith('/api')) return new Response('Not Found', { status: 404 });

        // 2. Prevent infinite loop if the static plugin fails to find public/index.html
        if (url.pathname === '/') return new Response('CRITICAL: Root index.html not found by static plugin', { status: 404 });

        // 3. The Loopback: Forces a new request to '/' to trigger the bundler
        url.pathname = '/';
        console.log(`[SPA Fallback] Proxying ${new URL(request.url).pathname} -> / to trigger bundler`);
        return fetch(url.toString());
    })

    // We MUST use await here, and we let indexHTML default to true so Bun's transpiler fires
    app.use(await staticPlugin({ assets: publicFolder, prefix: '/' }))
}
// =========================================================
// 🔴 PRODUCTION MODE: Pure Static Serving
// =========================================================
else {
    // indexHTML: false prevents Bun from trying to parse/bundle the HTML file
    app.use(staticPlugin({ assets: publicFolder, prefix: '/', indexHTML: false }))
}

// =========================================================
// API ROUTES (Shared)
// =========================================================
app.get('/api/ping', () => {
    console.log("BE called")
    return {
        status: 'success',
        data: `Data from persistent Bun daemon! isProd=${isProd} ` + new Date().toLocaleString()
    }
})

// =========================================================
// 🔴 PRODUCTION SPA FALLBACK
// =========================================================
if (isProd) {
    app.get('/*', async () => {
        // We bypass Bun.file() entirely to stop the VFS compiler from crashing
        const htmlPath = join(process.cwd(), publicFolder, 'index.html');
        const content = await readFile(htmlPath, 'utf8');
        return new Response(content, { headers: { 'Content-Type': 'text/html' } });
    })
}

app.listen(process.env.PORT || 3000)
console.log(`🦊 Elysia is running at ${app.server?.hostname}:${app.server?.port}`)