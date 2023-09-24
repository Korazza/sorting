import {
	Pause,
	Play,
	SkipBack,
	SkipForward,
	StepBack,
	StepForward,
} from "lucide-react"

import { Button } from "../ui/button"
import { Progress } from "../ui/progress"
import { useControls } from "@/hooks/use-control"
import { useAlgorithm } from "@/hooks/use-algorithm"
import { milliseconds2Minutes } from "@/lib/utils"

export const LowerControls = () => {
	const {
		isPlaying: playing,
		step,
		animationSpeed,
		backward,
		stepBackward,
		play,
		pause,
		stepForward,
		forward,
	} = useControls()
	const { framesCount } = useAlgorithm()

	return (
		<section className="flex w-fit flex-col items-center space-y-4">
			<div className="flex w-full flex-col-reverse place-items-center gap-4 md:flex-row md:gap-0 md:space-x-4">
				<div className="w-max break-keep rounded-lg p-neu text-xs shadow-neu dark:shadow-neu-dark">
					{milliseconds2Minutes(step * animationSpeed)}
					<span className="text-text-light/80 dark:text-text-dark/50">
						{" "}
						/ {milliseconds2Minutes(framesCount * animationSpeed)}
					</span>
				</div>
				<Progress min={0} max={framesCount} value={step} />
			</div>
			<div className="flex justify-center space-x-6 md:space-x-8">
				<Button onClick={backward}>
					<SkipBack className="w-5" />
				</Button>
				<Button onClick={stepBackward}>
					<StepBack className="w-5" />
				</Button>
				<Button onClick={playing ? pause : play}>
					{playing ? <Pause className="w-5" /> : <Play className="w-5" />}
				</Button>
				<Button onClick={stepForward}>
					<StepForward className="w-5" />
				</Button>
				<Button onClick={forward}>
					<SkipForward className="w-5" />
				</Button>
			</div>
		</section>
	)
}
