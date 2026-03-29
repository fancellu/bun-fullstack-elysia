import { Elysia, t } from 'elysia'
import { staticPlugin } from '@elysiajs/static'
import { swagger } from '@elysiajs/swagger'

// Check for NODE_ENV=production OR a --prod CLI flag (easier for Windows .exe)
const isProd = process.env.NODE_ENV === 'production' || Bun.argv.includes('--prod')

// LOUD DEBUG LOG
console.log('\n' + '='.repeat(40))
console.log(`🚀 RUNNING IN ${isProd ? 'PRODUCTION' : 'DEVELOPMENT'} MODE`)
console.log('='.repeat(40) + '\n')

const app = new Elysia()
    .use(swagger())
    .onBeforeHandle(({ params, query, path, body }) => {
        console.log(`\n[${new Date().toLocaleTimeString()}] ${path}`);
        if (Object.keys(params || {}).length > 0) console.log('  Params:', params);
        if (Object.keys(query || {}).length > 0) console.log('  Query:', query);
        if (body) {
            // Log body keys but avoid logging large file buffers
            const bodyKeys = Object.keys(body as object);
            console.log('  Body:', bodyKeys.join(', '));
        }
    })
    .onError(({ code, request, set }) => {
        if (code === 'NOT_FOUND') {
            const url = new URL(request.url);
            console.log(`Handling NOT_FOUND for ${url}`)

            // 1. Let missing API routes behave normally (return 404)
            if (url.pathname.startsWith('/api')) {
                return new Response('Not Found', { status: 404 });
            }

            // 2. Prevent an infinite loop just in case the root fails
            if (url.pathname === '/') {
                return new Response('Root index.html not found', { status: 404 });
            }

            // 3. Ask our own server for the root page!
            // This forces Bun's C++ server to intercept it, transpile the TSX,
            // inject the HMR websocket, and rewrite the HTML tags.
            url.pathname = '/';

            console.log(`[SPA Fallback] Proxying ${request.url} -> / to trigger bundler`);
            return fetch(url.toString());
        }
    })
    // Serve the React UI from the /public folder at the root '/'
    .use(isProd 
        ? staticPlugin({ prefix: '/' }) 
        : await staticPlugin({ prefix: '/' })
    )

    // Define your backend APIs
    .get('/api/ping', () => {
        console.log("BE called")
        return { 
            status: 'success', 
            data: `Data from persistent Bun daemon! I like kittens isProd=${isProd} ` + new Date().toLocaleString()
        }
    }, {
        response: t.Object({
            status: t.String(),
            data: t.String()
        }),
        detail: {
            summary: 'Ping the backend',
            description: 'Returns a success message with the current date.'
        }
    })

    // SPA Fallback: Any other GET request that isn't handled above will serve the main index.html
    // This allows React to handle the routing on the client side.


app.listen(process.env.PORT || 3000)

console.log(`🦊 Fullstack server running at http://${app.server?.hostname}:${app.server?.port}`)
console.log(`📖 API Documentation available at http://${app.server?.hostname}:${app.server?.port}/swagger`)
