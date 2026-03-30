import { createRoot } from 'react-dom/client'
import { App } from '../src/frontend/App'
import { App2 } from '../src/frontend/App2'
import { NotFound } from '../src/frontend/NotFound'
import { ThemeProvider } from '../src/frontend/ThemeContext'

const root = createRoot(document.getElementById('root')!)

// Simple SPA router based on pathname
const path = window.location.pathname

let componentToRender;
if (path === '/') {
    componentToRender = <App />;
} else if (path === '/App2') {
    componentToRender = <App2 />;
} else {
    componentToRender = <NotFound />;
}

root.render(
    <ThemeProvider>
        {componentToRender}
    </ThemeProvider>
)
