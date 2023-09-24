import { Bars } from "@/components/bars"
import { UpperControls } from "@/components/controls/upper-controls"
import { LowerControls } from "@/components/controls/lower-controls"
import { AlgorithmInfo } from "@/components/algorithm-info"
import "@/styles/app.css"

export const App = () => {
	return (
		<div className="flex w-full flex-col items-center space-y-8 py-3 md:py-0">
			<div className="flex w-full flex-col items-center space-y-10 md:h-[calc(100vh-4rem)] md:max-w-screen-md md:space-y-8">
				<UpperControls />
				<Bars />
				<LowerControls />
			</div>
			<AlgorithmInfo />
		</div>
	)
}
