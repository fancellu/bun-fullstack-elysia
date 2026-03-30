import { useState } from 'react'
import './App.css'
import { ThemeToggleButton } from './ThemeToggleButton'
import { useTheme } from './ThemeContext'

export function App() {
    const [data, setData] = useState<string | null>(null)
    const { theme } = useTheme(); // Get theme from context

    const fetchBackend = async () => {
        // Standard fetch, no CORS issues because it's served from the same port!
        const res = await fetch('/api/ping')
        const json = await res.json()
        setData(json.data)
    }

    return (
        <div className="app-container">
            <div className="header">
                <h1>Bun Fullstack + Elysia + React (No Vite)</h1>
                <ThemeToggleButton />
            </div>
            
            <div className="button-group">
                <button 
                    onClick={fetchBackend} 
                    className={`button ${theme === 'dark' ? 'button-dark' : 'button-light'}`}
                >
                    Ping Backend
                </button>
                <button 
                    onClick={() => window.location.href = '/App2'}
                    className={`button ${theme === 'dark' ? 'button-dark' : 'button-light'}`}
                >
                    App2
                </button>
            </div>

            {data && (
                <p className={`ping-result ${theme === 'dark' ? 'ping-result-dark' : 'ping-result-light'}`}>
                    {data}
                </p>
            )}
        </div>
    )
}
