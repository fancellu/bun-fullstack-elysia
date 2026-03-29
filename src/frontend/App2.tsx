import { useState, useEffect } from 'react'
// Bun 1.3 handles CSS imports in TSX natively!
import './App.css'

export function App2() {
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

    const toggleTheme = () => {
        setTheme(prev => prev === 'light' ? 'dark' : 'light')
    }

    return (
        <div className="app-container">
            <div className="header">
                <h1>App2</h1>
                <button 
                    onClick={toggleTheme} 
                    className={`button ${theme === 'dark' ? 'button-dark' : 'button-light'}`}
                >
                    {theme === 'light' ? '🌙 Dark Mode' : '☀️ Light Mode'}
                </button>
            </div>
            <a href="/">
                <button className={`button ${theme === 'dark' ? 'button-dark' : 'button-light'}`}>
                    App
                </button>
            </a>
        </div>
    )
}
