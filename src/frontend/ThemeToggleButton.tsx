import React from 'react';
import { useTheme } from './ThemeContext';

export function ThemeToggleButton() {
    const { theme, toggleTheme } = useTheme();

    return (
        <button 
            onClick={toggleTheme} 
            className={`button ${theme === 'dark' ? 'button-dark' : 'button-light'}`}
        >
            {theme === 'light' ? '🌙 Dark Mode' : '☀️ Light Mode'}
        </button>
    );
}
