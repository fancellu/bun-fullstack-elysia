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

// Only use the custom HTML handler in Production
if (isProd) {
    app.get('/', async () => {
        let html = await Bun.file('public/index.html').text()
        // Point to the bundled minified JS in production
        html = html.replace('./index.tsx', './dist/index.js')
        // Ensure CSS is linked
        if (!html.includes('dist/index.css')) {
            html = html.replace('</head>', '    <link rel="stylesheet" href="./dist/index.css">\n</head>')
        }
        return new Response(html, {
            headers: { 'Content-Type': 'text/html' }
        })
    })
}

app.listen(process.env.PORT || 3000)

console.log(`🦊 Fullstack server running at http://${app.server?.hostname}:${app.server?.port}`)
console.log(`📖 API Documentation available at http://${app.server?.hostname}:${app.server?.port}/swagger`)
