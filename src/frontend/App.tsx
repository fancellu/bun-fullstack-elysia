import { useState } from 'react'
import './App.css'
import { ThemeToggleButton } from './ThemeToggleButton'
import { Button } from "@frontend/components/ui/button";

export function App() {
    const [data, setData] = useState<string | null>(null)

    const fetchBackend = async () => {
        const res = await fetch('/api/ping')
        const json = await res.json()
        setData(json.data)
    }

    return (
        // Let globals.css handle the background/text colors automatically!
        <div className="app-container p-8">
            <div className="header flex justify-between items-center mb-4">
                <h1 className="text-2xl font-bold">Bun Fullstack + Elysia + React (No Vite)</h1>
                <ThemeToggleButton />
            </div>

            <div className="button-group flex gap-4">
                <Button onClick={fetchBackend}>
                    Ping Backend
                </Button>

                {/* Notice how we use standard Tailwind classes now, no manual checking! */}
                <Button
                    variant="secondary"
                    onClick={() => window.location.href = '/App2'}
                >
                    App2
                </Button>
            </div>

            {data && (
                <p className="mt-4 text-green-600 dark:text-green-400 font-medium">
                    {data}
                </p>
            )}
        </div>
    )
}