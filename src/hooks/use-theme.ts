import { useContext } from "react"

import { ThemeContext, ThemeContextType } from "@/contexts/theme"

/**
 * Custom hook for accessing the theme state from `ThemeContext`.
 *
 * This hook provides direct access to the context value, which includes:
 * - `theme`: The current active theme ('light', 'dark', or 'system').
 * - `setTheme`: Function to set the active theme.
 * - `toggleTheme`: Function to toggle between light and dark themes (or a predefined sequence).
 *
 * It's a shorthand for `useContext(ThemeContext)`.
 * Ensure this hook is used within a component tree wrapped by `ThemeProvider`.
 *
 * @returns {ThemeContextType} The theme context value.
 * @see {@link ThemeContext}
 * @see {@link ThemeProvider}
 */
export const useTheme = (): ThemeContextType => useContext(ThemeContext)
