import { defineConfig } from "vitest/config"
import viteConfig from "./vite.config" // Import the main Vite config
import { mergeConfig } from "vite"

export default mergeConfig(
	viteConfig, // Extend the existing Vite configuration
	defineConfig({
		test: {
			globals: true, // Allow global test APIs (describe, it, expect, etc.)
			environment: "jsdom", // Simulate a browser environment for React components (useful if testing components later)
			setupFiles: [], // Optional: path to setup files (e.g., for global mocks or test setup)
			include: ["src/**/*.{test,spec}.{js,mjs,cjs,ts,mts,cts,jsx,tsx}"], // Pattern for test files
			coverage: {
				provider: "v8", // or 'istanbul'
				reporter: ["text", "json", "html"], // Coverage reporters
				reportsDirectory: "./coverage", // Directory for coverage reports
			},
		},
	})
)
