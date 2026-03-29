import { createRoot } from 'react-dom/client'
import { App } from '../src/frontend/App'
import { App2 } from '../src/frontend/App2'

const root = createRoot(document.getElementById('root')!)

// Simple SPA router based on pathname
const path = window.location.pathname

if (path === '/App2') {
    root.render(<App2 />)
} else {
    root.render(<App />)
}
