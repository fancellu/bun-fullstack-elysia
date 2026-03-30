# Bun + Elysia + React (Fullstack 1.3+)

A lightweight, high-performance fullstack boilerplate using **Bun 1.3+**, **ElysiaJS**, and **React** (without Vite or Webpack). This setup leverages Bun's native transpiler and fullstack server for an incredibly fast development experience.

## ✨ Features

- **🚀 Bun 1.3 Fullstack Magic**: Native TSX transpilation and HMR (Hot Module Replacement) with zero config.
- **⚡ ElysiaJS Backend**: High-performance backend with built-in schema validation and documentation.
- **🛠️ Zero Build Dev**: Reference `.tsx` directly in your HTML during development.
- **📦 Production Ready**: Seamless transition from Dev (on-the-fly) to Prod (pre-bundled/minified).
- **📖 API Docs**: Automatic Swagger documentation available at `/swagger`.
- **🖥️ Standalone Executables**: Compile your entire app into a single Windows or Linux binary.

## 📁 Project Structure

```text
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
```bash
bun install
```

### 2. Run in Development
The dev server uses Bun's Fullstack mode with HMR. Just run:
```bash
bun run fullstack:dev
```
- Frontend: [http://localhost:3000](http://localhost:3000) (Serves `App.tsx` by default)
- Frontend: [http://localhost:3000/App2](http://localhost:3000/App2) (Serves `App2.tsx`)
- Frontend: [http://localhost:3000/fake-path](http://localhost:3000/App2) (Serves `NotFound.tsx` for 404)
- Frontend: Any other path will render the `NotFound` component.
- API Docs: [http://localhost:3000/swagger](http://localhost:3000/swagger)

---

## 🏗️ Production Workflow

To deploy for production, follow these steps:

### 1. Build Frontend Assets
Build and optimize the React code. The `min:prod` script uses Bun 1.3's native `--production` flag, which automatically enables minification, tree-shaking, and React production transforms (resulting in a tiny ~180kb bundle).
```bash
bun run build:fe:min:prod
```

### 2. Build Backend Executable (Optional)
Compile the server into a standalone Windows `.exe` or Linux binary. 
During the build, `process.env.NODE_ENV` is statically defined as `"production"` inside the binary.

```bash
# Windows
bun run build:be

# Linux
bun run build:be:linux
```

### 3. Run in Production Mode

If you are running the backend using Bun directly, you still need to pass `--prod` to use pre-bundled assets. If you are running the compiled executables, they are natively built for production.

```bash
# Via Bun (requires --prod flag)
bun run start:prod

# Via compiled .exe (Windows - prod is built in)
bun run start:win:prod

# Via compiled Linux binary (prod is built in)
bun run start:linux:prod
```

## 📜 Available Scripts

| Script | Description |
| :--- | :--- |
| `fullstack:dev` | Start the Fullstack Dev Server with HMR (Bun 1.3 magic). |
| `start:prod` | Run the backend in Production mode using Bun. |
| `build:fe:min:prod` | **Recommended**: Smallest frontend bundle for production. |
| `build:be` | Compile the backend to a Windows binary (`server.exe`). |
| `build:be:linux` | Compile the backend for Linux systems (`server-linux`). |
| `build:all` | Build backend and frontend executables/assets all at once. |
| `start:win:prod` | Run the compiled Windows executable. |
| `start:linux:prod` | Run the compiled Linux executable. |

## 🛡️ API Validation
This project uses Elysia's `t` schema validation. All API endpoints in `src/backend/index.ts` are strictly typed and documented automatically.

## 🎨 Styling
Styles are managed in `src/frontend/App.css`. Bun natively handles CSS imports in your `.tsx` files, bundling them automatically for both Dev and Production.
The `ThemeToggleButton` component is now a reusable component in `src/frontend/ThemeToggleButton.tsx`.

## N.B.

If you see "bundle index.html", that is the static plugin, turning the html tsx refs into .js