import './App.css'
import { ThemeToggleButton } from './ThemeToggleButton'
import { useTheme } from './ThemeContext'
import {Button} from "@frontend/components/ui/button";

export function App2() {
    const { theme } = useTheme(); // Get theme from context

    return (
        <div className="app-container">
            <div className="header">
                <h1>App2</h1>
                <ThemeToggleButton />
            </div>
            <Button
                onClick={()=> window.location.href = '/'}
            >
                App
            </Button>
        </div>
    )
}
