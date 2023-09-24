import { PropsWithChildren, createContext, useEffect, useState } from "react"

import { Theme } from "@/types"
import { useLocalStorage } from "@/hooks/use-local-storage"

type ThemeContextType = {
	theme: Theme
	isDark: boolean
	toggleTheme: () => void
}

export const ThemeContext = createContext<ThemeContextType>({
	theme: Theme.system,
	isDark: false,
	toggleTheme: () => {},
})

export const ThemeProvider = (props: PropsWithChildren) => {
	const [theme, setTheme] = useLocalStorage<ThemeContextType["theme"]>(
		"theme",
		Theme.system
	)
	const [isDark, setIsDark] = useState<ThemeContextType["isDark"]>(false)

	const toggleTheme = () => {
		setTheme((prevDarkMode) =>
			prevDarkMode.valueOf() == 2
				? Theme.system.valueOf()
				: prevDarkMode.valueOf() + 1
		)
	}

	useEffect(() => {
		if (
			theme === Theme.dark ||
			(theme === Theme.system &&
				matchMedia("(prefers-color-scheme: dark)").matches)
		) {
			setIsDark(true)
			document.documentElement.classList.add("dark")
		} else {
			setIsDark(false)
			document.documentElement.classList.remove("dark")
		}
	}, [theme])

	return (
		<ThemeContext.Provider
			value={{
				theme,
				toggleTheme,
				isDark,
			}}
			{...props}
		/>
	)
}
