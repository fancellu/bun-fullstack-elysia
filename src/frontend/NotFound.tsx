import './App.css'
import { ThemeToggleButton } from './ThemeToggleButton';
import { useTheme } from './ThemeContext';

export function NotFound() {
    const { theme } = useTheme();

    return (
        <div className="app-container">
            <div className="header">
                <h1>Not found</h1>
                <ThemeToggleButton />
            </div>
            <div>
                <p>Sorry, we couldn't find the page you're looking for.</p>
                <button
                    onClick={()=> window.location.href = '/'}
                    className={`button ${theme === 'dark' ? 'button-dark' : 'button-light'}`}
                >
                    Back to Homepage
                </button>
            </div>
        </div>
    );
}
