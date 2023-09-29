import { useEffect, useState } from "react"
import { ChevronsDown, Moon, MoonStar, RotateCw, Sun } from "lucide-react"
import { useAnimate } from "framer-motion"

import { Button } from "../ui/button"
import { Select, SelectOption } from "../ui/select"
import { Tooltip } from "../ui/tooltip"
import { ALGORITHMS } from "@/lib/sorting-algorithms"
import { cn } from "@/lib/utils"
import { useTheme } from "@/hooks/use-theme"
import { useAlgorithm } from "@/hooks/use-algorithm"
import { useControls } from "@/hooks/use-control"
import { Theme } from "@/types"

const dropdownOptions: SelectOption[] = ALGORITHMS.map((algorithm) => ({
	label: algorithm.label as string,
	value: algorithm,
}))

export const UpperControls = () => {
	const { theme, toggleTheme } = useTheme()
	const { setAlgorithm } = useAlgorithm()
	const { reset, backward } = useControls()
	const [selectedAlgorithm, setSelectedAlgorithm] = useState<SelectOption>()
	const [showScrollButton, setShowScrollButton] = useState(false)
	const [downIconRef, animate] = useAnimate()

	const setSelected = (selected: SelectOption) => {
		setSelectedAlgorithm(selected)
		setAlgorithm(selected?.value)
	}

	useEffect(() => {
		const handleScroll = () => {
			setShowScrollButton(
				!(
					window.innerHeight + Math.round(window.scrollY) >=
					document.body.offsetHeight
				)
			)
		}
		window.addEventListener("scroll", handleScroll)
		return () => window.removeEventListener("scroll", handleScroll)
	}, [])

	useEffect(() => {
		animate(
			downIconRef.current,
			{
				y: ["-10%", "10%", "-10%"],
				opacity: ["100%", "50%", "100%"],
			},
			{
				repeat: Infinity,
				duration: 1.25,
				type: "tween",
			}
		)
	}, [animate, downIconRef])

	return (
		<>
			<section className="flex items-center justify-center space-x-8">
				<Select
					placeholder="Algorithm"
					options={dropdownOptions}
					selected={selectedAlgorithm}
					onChange={(selected) => {
						if (selected) {
							backward()
							setSelected(selected)
							setShowScrollButton(true)
						}
					}}
				/>
				<Button onClick={reset}>
					Reset <RotateCw className="ml-2 w-5" />
				</Button>
				<Tooltip label={Theme[theme]} className="capitalize">
					<Button onClick={toggleTheme}>
						{theme === Theme.system ? (
							<MoonStar className="w-5 text-sky-500 dark:text-sky-600" />
						) : theme === Theme.light ? (
							<Sun className="w-5" />
						) : (
							<Moon className="w-5" />
						)}
					</Button>
				</Tooltip>
			</section>
			<Button
				className={cn(
					"absolute bottom-8 mr-4 hidden rounded-full p-3 drop-shadow-lg md:bottom-8 md:right-8",
					showScrollButton && "md:block"
				)}
				onClick={() => {
					window.scrollTo({ top: window.innerHeight })
				}}
			>
				<ChevronsDown ref={downIconRef} className="w-6" />
			</Button>
		</>
	)
}
