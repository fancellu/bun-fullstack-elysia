# Bun + Elysia + React (Fullstack 1.3+)

A lightweight, high-performance fullstack boilerplate using **Bun 1.3+**, **ElysiaJS**, and **React** (without Vite or Webpack). This setup leverages Bun's native transpiler and fullstack server for an incredibly fast development experience, and deploys as a **zero-dependency single-file executable**.

## ✨ Features

* **🚀 Bun 1.3 Fullstack Magic**: Native TSX transpilation and HMR (Hot Module Replacement) with zero config.

* **⚡ ElysiaJS Backend**: High-performance backend with built-in schema validation and documentation.

* **🗂️ Virtual File System ($bunfs)**: Compiles your entire React app directly into C++ memory. No `node_modules` or `public` folders required in production!

* **🛠️ Zero Build Dev**: Reference `.tsx` directly in your HTML during development.

* **🎨 Modern Styling**: Integrated with **Tailwind CSS v4** and **shadcn/ui** for rapid UI development.

* **📖 API Docs**: Automatic Swagger documentation available at `/swagger`.

* **🖥️ Standalone Executables**: Compile your entire app into a single Windows `.exe` or Linux binary.

## 📁 Project Structure

```
├── src/
│   ├── backend/        # Elysia server & API logic
│   └── frontend/       # React components & CSS
├── public/
│   ├── index.html      # Frontend entry HTML
│   ├── index.tsx       # Main SPA entry point
│   └── dist/           # Bundled production assets (generated)
├── .env                # Environment configuration
└── package.json        # Build & Dev scripts

```

## 🛠️ Getting Started

### 1. Install Dependencies

```
bun install

```

### 2. Run in Development

The dev server uses Bun's Fullstack mode with HMR. Just run:

```
bun run fullstack:dev

```

* **Frontend SPA**: http://localhost:3000 (Serves `App.tsx`)

* **React Router**: http://localhost:3000/App2 (Serves `App2.tsx`)

* **SPA Fallback**: http://localhost:3000/fake-path (Serves custom `NotFound.tsx` for 404s)

* **API Docs**: http://localhost:3000/swagger

## 🏗️ Production Workflow (Single-File Executable)

To deploy for production, this boilerplate uses a highly predictable 3-file build architecture (`index.html`, `index.js`, `index.css`) to safely embed your React app directly into the Bun binary.

### 1. Build Frontend Assets

Build and optimize the React code. The `build:fe:prod` script uses Bun 1.3's native `--production` flag, which automatically enables minification, tree-shaking, and Tailwind compilation.

```
bun run build:fe:prod

```

*(Note: You only need to run this once locally to populate the `dist` folder so the IDE stays happy!)*

### 2. Build Backend Executable

Compile the server and the frontend assets into a standalone Windows `.exe` or Linux binary.
During the build, `process.env.NODE_ENV` is statically defined as `"production"` inside the binary.

```
# Windows
bun run build:be

# Linux
bun run build:be:linux

# Build EVERYTHING (Frontend + Win + Linux)
bun run build:all

```

### 3. Run in Production Mode

If you are running the compiled executables, they are natively built for production and bind to `0.0.0.0`. You can safely drop the single file onto a VPS and execute it.

```
# Via compiled .exe (Windows)
bun run start:win:prod

# Via compiled Linux binary
bun run start:linux:prod

# Via Bun daemon directly (requires --prod flag)
bun run start:prod

```

## 📜 Available Scripts

| **Script** | **Description** |
| :--- | :--- |
| `fullstack:dev` | Start the Fullstack Dev Server with HMR (Bun 1.3 magic). |
| `start:prod` | Run the backend in Production mode using the Bun daemon. |
| `build:fe:prod` | Cleans the `dist` folder and compiles the frontend for production. |
| `build:be` | Compile the backend + frontend into a Windows binary (`server.exe`). |
| `build:be:linux` | Compile the backend + frontend for Linux systems (`server-linux`). |
| `build:all` | Build frontend assets and both executables sequentially. |
| `start:win:prod` | Run the compiled Windows executable. |
| `start:linux:prod` | Run the compiled Linux executable. |

## 🛡️ API Validation

This project uses Elysia's `t` schema validation. All API endpoints in `src/backend/index.ts` are strictly typed, meaning invalid requests are rejected automatically before they even reach your route logic.

## 🎨 Styling

Styles are managed in `src/frontend/App.css` and `src/frontend/globals.css`. Bun natively handles CSS imports in your `.tsx` files, bundling them automatically for both Dev and Production.

This project uses **Tailwind CSS v4** and **shadcn/ui**.

For example, to add a button component using shadcn:

```
bunx --bun shadcn@latest add button

```

*(Note: The `ThemeToggleButton` component is a reusable component available in `src/frontend/ThemeToggleButton.tsx` that manages dark mode via Tailwind's root classes).*