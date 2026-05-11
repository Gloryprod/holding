"use client"

import { useTheme } from "next-themes"
import { Moon, Sun } from "lucide-react"

export function ThemeToggle() {
  const { resolvedTheme, setTheme } = useTheme();

  return (
    <button
      onClick={() => setTheme(resolvedTheme === "dark" ? "light" : "dark")}
      className="cursor-pointer p-2 rounded-md hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
      aria-label="Changer de thème"
    >
      {resolvedTheme === "dark" ? (
        <Sun size={20} className="text-yellow-200 hover:text-black" />
      ) : (
        <Moon size={20} className="text-slate-700" />
      )}
    </button>
  )
}