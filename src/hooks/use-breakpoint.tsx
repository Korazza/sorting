import { useMediaQuery } from "react-responsive"
import resolveConfig from "tailwindcss/resolveConfig"
import { Config } from "tailwindcss/types/config" // Removed ScreensConfig

import tailwindConfig from "../../tailwind.config"

const fullConfig = resolveConfig(tailwindConfig as unknown as Config)

const breakpoints = fullConfig?.theme?.screens || {
	xs: "480px",
	sm: "640px",
	md: "768px",
	lg: "1024px",
	xl: "1280px",
}

// type BreakpointKey = keyof ScreensConfig // No longer needed with direct keyof typeof

/**
 * Custom hook to determine if the current viewport width is above or below a specific Tailwind CSS breakpoint.
 * It uses `react-responsive`'s `useMediaQuery` under the hood.
 * The breakpoints are derived from the Tailwind configuration.
 *
 * @template K A key of the `breakpoints` object (e.g., 'sm', 'md', 'lg').
 * @param {K} breakpointKey The Tailwind CSS breakpoint key to check against.
 * @returns {{ size: number; isAbove: boolean; isBelow: boolean }} An object containing:
 *  - `size`: The numerical value (in pixels) of the specified breakpoint.
 *  - `isAbove`: Boolean, true if the current viewport width is greater than the breakpoint value.
 *  - `isBelow`: Boolean, true if the current viewport width is less than or equal to the breakpoint value.
 *              (Note: `useMediaQuery` with `max-width` means `isBelow` is true when screen <= breakpoint).
 */
export function useBreakpoint<K extends keyof typeof breakpoints>(breakpointKey: K) {
	const breakpointValue = breakpoints[breakpointKey]
	// useMediaQuery with max-width: value will be true if screen_width <= value
	const isBelowBreakpoint = useMediaQuery({
		query: `(max-width: ${breakpointValue})`,
	})

	return {
		size: Number(String(breakpointValue).replace(/[^0-9]/g, "")),
		isAbove: !isBelowBreakpoint,
		isBelow: isBelowBreakpoint,
	}
}
