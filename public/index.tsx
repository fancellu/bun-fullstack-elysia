import { useState, useEffect } from 'react'
import { createRoot } from 'react-dom/client'

function App() {
    const [data, setData] = useState<string | null>(null)
    const [theme, setTheme] = useState<'light' | 'dark'>('light')

    // Load initial theme from localStorage or system preference
    useEffect(() => {
        const savedTheme = localStorage.getItem('theme') as 'light' | 'dark' | null
        if (savedTheme) {
            setTheme(savedTheme)
        } else if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
            setTheme('dark')
        }
    }, [])

    // Apply theme changes to body and save to localStorage
    useEffect(() => {
        localStorage.setItem('theme', theme)
        document.body.style.backgroundColor = theme === 'dark' ? '#121212' : '#ffffff'
        document.body.style.color = theme === 'dark' ? '#ffffff' : '#000000'
        document.body.style.margin = '0'
    }, [theme])

    const fetchBackend = async () => {
        // Standard fetch, no CORS issues because it's served from the same port!
        const res = await fetch('/api/ping')
        const json = await res.json()
        setData(json.data)
    }

    const toggleTheme = () => {
        setTheme(prev => prev === 'light' ? 'dark' : 'light')
    }

    return (
        <div style={{ padding: '2rem', fontFamily: 'system-ui', minHeight: '100vh', boxSizing: 'border-box' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem' }}>
                <h1 style={{ margin: 0 }}>Bun + Elysia + React (No Vite)</h1>
                <button 
                    onClick={toggleTheme} 
                    style={{ 
                        padding: '8px 16px', 
                        cursor: 'pointer',
                        backgroundColor: theme === 'dark' ? '#333' : '#eee',
                        color: theme === 'dark' ? '#fff' : '#000',
                        border: '1px solid',
                        borderColor: theme === 'dark' ? '#555' : '#ccc',
                        borderRadius: '4px'
                    }}
                >
                    {theme === 'light' ? '🌙 Dark Mode' : '☀️ Light Mode'}
                </button>
            </div>
            <button 
                onClick={fetchBackend} 
                style={{ 
                    padding: '8px 16px', 
                    cursor: 'pointer',
                    backgroundColor: theme === 'dark' ? '#333' : '#eee',
                    color: theme === 'dark' ? '#fff' : '#000',
                    border: '1px solid',
                    borderColor: theme === 'dark' ? '#555' : '#ccc',
                    borderRadius: '4px'
                }}
            >
                Ping Backend
            </button>
            {data && <p style={{ marginTop: '20px', color: theme === 'dark' ? '#4caf50' : 'green' }}>{data}</p>}
        </div>
    )
}

const root = createRoot(document.getElementById('root')!)
root.render(<App />)