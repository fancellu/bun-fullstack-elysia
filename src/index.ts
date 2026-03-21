import { Elysia } from 'elysia'
import { staticPlugin } from '@elysiajs/static'

const app = new Elysia()
    // 1. Serve the React UI from the /public folder
    .use(await staticPlugin({ prefix: '/' }))
    // If you have built FE public/dist/index.js you don't want to use await
    // .use(staticPlugin({ prefix: '/' }))

    // 2. Define your backend APIs
    .get('/api/ping', () => {
        console.log("BE called")
        return { status: 'success', data: 'Data from persistent Bun daemon! I like kittens '+new Date() }
    })
    .listen(3000)

console.log(`🦊 Fullstack server running at ${app.server?.hostname}:${app.server?.port}`)