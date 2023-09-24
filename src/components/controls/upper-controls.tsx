import { Moon, MoonStar, RotateCw, Sun } from "lucide-react"

import { Button } from "../ui/button"
import { Select, SelectOption } from "../ui/select"
import { Tooltip } from "../ui/tooltip"
import { ALGORITHMS } from "@/lib/sorting-algorithms"
import { useTheme } from "@/hooks/use-theme"
import { useAlgorithm } from "@/hooks/use-algorithm"
import { Theme } from "@/types"
import { useState } from "react"
import { useControls } from "@/hooks/use-control"

const dropdownOptions: SelectOption[] = ALGORITHMS.map((algorithm) => ({
	label: algorithm.label as string,
	value: algorithm,
}))

export const UpperControls = () => {
	const { theme, toggleTheme } = useTheme()
	const { setAlgorithm } = useAlgorithm()
	const { reset, backward } = useControls()
	const [selectedAlgorithm, setSelectedAlgorithm] = useState<SelectOption>()

	const setSelected = (selected: SelectOption) => {
		setSelectedAlgorithm(selected)
		setAlgorithm(selected?.value)
	}

	return (
		<section className="flex items-center justify-center space-x-8">
			<Select
				placeholder="Algorithm"
				options={dropdownOptions}
				selected={selectedAlgorithm}
				onChange={(selected) => {
					if (selected) {
						backward()
						setSelected(selected)
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
	)
}
