import { useEffect, useState } from "react"
import { useAnimate } from "framer-motion"
import { ChevronDown } from "lucide-react"

import { cn } from "@/lib/utils"

export type SelectOption = {
	label: string
	// eslint-disable-next-line @typescript-eslint/no-explicit-any
	value: any
}

type SelectProps = {
	placeholder?: string
	options: SelectOption[]
	selected?: SelectOption
	onChange: (value: SelectProps["selected"]) => void
}

export const Select = ({
	placeholder = "Select an option",
	selected,
	options,
	onChange,
}: SelectProps) => {
	const [isOpen, setIsOpen] = useState(false)
	const [iconRef, animateIcon] = useAnimate()
	const [optionsRef, animateOptions] = useAnimate()

	useEffect(() => {
		animateIcon(
			iconRef.current,
			{ rotate: isOpen ? 180 : 0 },
			{ duration: 0.15 }
		)
	}, [animateIcon, iconRef, isOpen])

	useEffect(() => {
		animateOptions(
			optionsRef.current,
			{ scaleY: isOpen ? 1 : 0 },
			{ duration: 0.15, ease: "easeIn" }
		)
	}, [animateOptions, optionsRef, isOpen])

	const selectOption = (option: SelectOption) => {
		onChange(option)
	}

	return (
		<div
			className={cn(
				"relative cursor-pointer rounded-lg p-neu shadow-neu transition-[border-bottom-right-radius_border-bottom-left-radius] dark:shadow-neu-dark",
				isOpen && "rounded-b-none"
			)}
			onClick={() => setIsOpen((prev) => !prev)}
			onBlur={() => setIsOpen(false)}
		>
			<span
				className={cn(
					"flex select-none text-text-light/50 dark:text-text-dark/50",
					selected && "text-text-light dark:text-text-dark"
				)}
			>
				{selected?.label || placeholder}
				<ChevronDown ref={iconRef} className="ml-2 inline w-6" />
			</span>
			<ul
				ref={optionsRef}
				className="absolute left-0 top-full z-10 w-full origin-top scale-y-0 flex-col rounded-b-lg bg-background-light drop-shadow-xl transition-transform dark:bg-background-dark"
			>
				{options.map((option) => (
					<li
						key={option.label}
						className={cn(
							"cursor-pointer py-2 text-center text-text-light hover:bg-background-dark/5 group-hover:block dark:text-text-dark hover:dark:bg-background-light/5",
							selected?.label === option.label &&
								"bg-background-dark/10 hover:bg-background-dark/10 dark:bg-background-light/10 hover:dark:bg-background-light/10"
						)}
						onClick={(e) => {
							e.stopPropagation()
							selectOption(option)
							setIsOpen(false)
						}}
					>
						{option.label}
					</li>
				))}
			</ul>
		</div>
	)
}
