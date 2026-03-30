import './App.css'
import { ThemeToggleButton } from './ThemeToggleButton'
import { useTheme } from './ThemeContext'

export function App2() {
    const { theme } = useTheme(); // Get theme from context

    return (
        <div className="app-container">
            <div className="header">
                <h1>App2</h1>
                <ThemeToggleButton />
            </div>
            <button 
                onClick={()=> window.location.href = '/'}
                className={`button ${theme === 'dark' ? 'button-dark' : 'button-light'}`}
            >
                App
            </button>
        </div>
    )
}
