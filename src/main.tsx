import React from "react"
import ReactDOM from "react-dom/client"

import { App } from "@/app"
import { ThemeProvider } from "@/contexts/theme.tsx"
import { AlgorithmProvider } from "@/contexts/algorithm"
import "@/styles/style.css"
import { ControlsProvider } from "@/contexts/controls"

ReactDOM.createRoot(document.getElementById("root")!).render(
	<React.StrictMode>
		<ThemeProvider>
			<AlgorithmProvider>
				<ControlsProvider>
					<App />
				</ControlsProvider>
			</AlgorithmProvider>
		</ThemeProvider>
	</React.StrictMode>
)
