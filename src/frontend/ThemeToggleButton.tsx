import { useTheme } from './ThemeContext';
import { Button } from '@frontend/components/ui/button';

export function ThemeToggleButton() {
    const { theme, toggleTheme } = useTheme();

    return (
        <Button variant="outline" onClick={toggleTheme}>
            {theme === 'light' ? '🌙 Dark Mode' : '☀️ Light Mode'}
        </Button>
    );
}