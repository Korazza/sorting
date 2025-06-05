import { useEffect, useRef } from "react"
import { useAnimate, useReducedMotion } from "framer-motion"

import { useControls } from "@/hooks/use-control"
import { useBreakpoint } from "@/hooks/use-breakpoint"
import { useAlgorithm } from "@/hooks/use-algorithm"
import { cn } from "@/lib/utils"
import { useTheme } from "@/hooks/use-theme"

type BarProps = {
	value: number
	index: number
}

const Bar = ({ value, index }: BarProps) => {
	const { frame } = useControls()
	const { isAbove: isAboveMd } = useBreakpoint("md")
	const [barRef, animate] = useAnimate()
	const shouldReduceMotion = useReducedMotion()
	const { isDark } = useTheme()
	const backgrounds = useRef<Record<string, string>>({})

	useEffect(() => {
		backgrounds.current = {
			normal: isDark
				? "linear-gradient(85deg, #0092d5 0%, #0400eb 100%)"
				: "linear-gradient(85deg, #00a6f3 0%, #0c07ff 100%)",
			yellow: isDark
				? "linear-gradient(85deg, #cfb802 0%, #b36100 100%)"
				: "linear-gradient(85deg, #edd202 0%, #d47300 100%)",
			red: isDark
				? "linear-gradient(85deg, #f600c0 0%, #ab1212 78%)"
				: "linear-gradient(85deg, #ff11cb 0%, #c81515 78%)",
			purple: isDark
				? "linear-gradient(85deg, #b000f6 0%, #6212ab 78%)"
				: "linear-gradient(85deg, #bb11ff 0%, #7315c8 78%)",
			sorted: isDark
				? "linear-gradient(85deg, #1fc92e 0%, #1e8000d3 78%)"
				: "linear-gradient(85deg, #26de36 0%, #27a600d3 78%)",
		}
	}, [isDark])

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
						? backgrounds.current["yellow"]
						: frame.redFrame?.includes(index)
							? backgrounds.current["red"]
							: frame.purpleFrame?.includes(index)
								? backgrounds.current["purple"]
								: frame.sortedFrame?.includes(index)
									? backgrounds.current["sorted"]
									: backgrounds.current["normal"]
					: backgrounds.current["normal"],
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
				style={{
					textShadow: isDark
						? "0 0 4px rgba(0, 0, 0, 0.3)"
						: "0 0 3px rgba(0, 0, 0, 0.2)",
				}}
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
			).map((value: number, index: number) => (
				<Bar key={index} value={value} index={index} />
			))}
		</section>
	)
}
