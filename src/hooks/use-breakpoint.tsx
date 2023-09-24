import { useMediaQuery } from "react-responsive"
import resolveConfig from "tailwindcss/resolveConfig"
import { Config, ScreensConfig } from "tailwindcss/types/config"

import tailwindConfig from "../../tailwind.config"

const fullConfig = resolveConfig(tailwindConfig as unknown as Config)

const breakpoints = fullConfig?.theme?.screens || {
	xs: "480px",
	sm: "640px",
	md: "768px",
	lg: "1024px",
	xl: "1280px",
}

type BreakpointKey = keyof ScreensConfig

export function useBreakpoint<K extends string>(breakpointKey: K) {
	const breakpointValue = breakpoints[breakpointKey as BreakpointKey]
	const bool = useMediaQuery({
		query: `(max-width: ${breakpointValue})`,
	})

	return {
		size: Number(String(breakpointValue).replace(/[^0-9]/g, "")),
		isAbove: !bool,
		isBelow: bool,
	}
}
