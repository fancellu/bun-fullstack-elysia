# Bun Fullstack Example with Elysia

This is a fullstack application example using the [Bun runtime](https://bun.sh) and [ElysiaJS](https://elysiajs.com).

## References

- [Elysia - Fullstack Dev Server](https://elysiajs.com/patterns/fullstack-dev-server.html)
- [Bun - Fullstack Bundler](https://bun.sh/docs/bundler/fullstack)
- [Bun LLMs Documentation](https://bun.sh/llms-full.txt)
- [Elysia LLMs Documentation](https://elysiajs.com/llms-full.txt)

## Getting Started

First, install the dependencies:
```bash
bun install
```

## Available Scripts

You can run the following commands using `bun run <script>`:

### Development
- `fullstack:dev` - Starts the development server in watch mode.

### Build (Backend)
- `build:win` - Compiles the server into a standalone executable for Windows (`server.exe` / `server`).
- `build:linux` - Compiles the server into a standalone executable for Linux x64 (`server-linux`).
- `build:all` - Runs both `build:win` and `build:linux`.

### Build (Frontend)
- `build:fe` - Builds the frontend React application to `./public/dist`.
- `build:fe:min` - Builds and minifies the frontend React application.

### Execution
- `start:win` - Runs the compiled executable (`server`).
- `start:linux` - Runs the compiled executable (`server-linux`).

## Running the app

To start the development server run:
```bash
bun run fullstack:dev
```

Open http://localhost:3000/ with your browser to see the result.

The front end is served from [index.tsx](public/index.tsx)

Click the 'PingBackend' button to have it ping /api/ping in [index.tsx](public/index.tsx)