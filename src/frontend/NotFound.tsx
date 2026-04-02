import './App.css'
import { ThemeToggleButton } from './ThemeToggleButton';
import { useTheme } from './ThemeContext';
import {Button} from "@frontend/components/ui/button";

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
                <br/>
                <Button
                    onClick={()=> window.location.href = '/'}
                >
                    Back to Homepage
                </Button>
            </div>
        </div>
    );
}
