import { useEffect } from "react"
import { useAnimate, useReducedMotion } from "framer-motion"

import { useControls } from "@/hooks/use-control"
import { useBreakpoint } from "@/hooks/use-breakpoint"
import { useAlgorithm } from "@/hooks/use-algorithm"
import { cn } from "@/lib/utils"

type BarProps = {
	value: number
	index: number
}

const backgrounds: Record<string, string> = {
	normal: "linear-gradient(85deg, #31beff 0%, #5451ff 100%)",
	yellow: "linear-gradient(85deg, #fde62d 0%, #ff8a00 100%)",
	red: "linear-gradient(85deg, #ff61dc 0%, #e82727 78%)",
	purple: "linear-gradient(85deg, #d261ff 0%, #8b27e8 78%)",
	sorted: "linear-gradient(85deg, #65e770 0%, #2bb700d3 78%)",
}

const Bar = ({ value, index }: BarProps) => {
	const { frame } = useControls()
	const { isAbove: isAboveMd } = useBreakpoint("md")
	const [barRef, animate] = useAnimate()
	const shouldReduceMotion = useReducedMotion()

	useEffect(() => {
		animate(
			barRef.current,
			{
				height: isAboveMd ? `${value}%` : "100%",
				width: isAboveMd ? "100%" : `${value}%`,
			},
			{ duration: shouldReduceMotion ? 0 : 0.3 }
		)
	}, [barRef, animate, value, isAboveMd, shouldReduceMotion])

	useEffect(() => {
		animate(
			barRef.current,
			{
				background: frame
					? frame.yellowFrame?.includes(index)
						? backgrounds["yellow"]
						: frame.redFrame?.includes(index)
						? backgrounds["red"]
						: frame.purpleFrame?.includes(index)
						? backgrounds["purple"]
						: frame.sortedFrame?.includes(index)
						? backgrounds["sorted"]
						: backgrounds["normal"]
					: backgrounds["normal"],
			},
			{ duration: shouldReduceMotion ? 0 : 0.3 }
		)
	}, [animate, frame, index, barRef, shouldReduceMotion])

	return (
		<div className="flex flex-1 items-center justify-start md:items-end md:justify-center">
			<div
				ref={barRef}
				className={cn(
					"flex min-h-[26px] min-w-[32px] items-center justify-end rounded-md pr-2 font-semibold text-white drop-shadow md:max-h-max md:min-h-[32px] md:items-start md:justify-center md:py-1 md:pr-0",
					value == 1 && "justify-center pr-0"
				)}
				style={{ textShadow: "0 0 4px rgba(0, 0, 0, 0.3)" }}
			>
				{value}
			</div>
		</div>
	)
}

export const Bars = () => {
	const { initialBarValues } = useAlgorithm()
	const { step, frame } = useControls()

	return (
		<section className="flex w-full min-w-fit flex-1 select-none flex-col gap-2 p-6 shadow-neu-xl dark:shadow-neu-xl-dark md:flex-auto md:flex-row md:rounded-2xl">
			{(frame && frame.arrayFrame.length > 0 && step > 0
				? frame.arrayFrame
				: initialBarValues
			).map((value, index) => (
				<Bar key={index} value={value} index={index} />
			))}
		</section>
	)
}
