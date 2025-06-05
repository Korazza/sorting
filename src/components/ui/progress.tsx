import { useEffect } from "react"
import { useAnimate } from "framer-motion"

type ProgressProps = {
	min: number
	max: number
	value: number
}

export const Progress = ({ value, min, max }: ProgressProps) => {
	const [scope, animate] = useAnimate()

	const progress = ((value - min) * 100) / (max - min === 0 ? 1 : max - min)

	useEffect(() => {
		animate(scope.current, { width: `${progress}%` }, { duration: 1 })
	}, [animate, max, progress, scope])

	return (
		<div
			className="flex w-full flex-1 items-center justify-start rounded-lg bg-background-light p-neu shadow-neu transition-[width] dark:bg-background-dark dark:shadow-neu-dark"
			role="progressbar"
			aria-valuenow={progress}
			aria-valuemin="0"
			aria-valuemax="100"
			aria-label="Sorting animation progress"
		>
			<div
				ref={scope}
				className="h-3 w-0 rounded-lg bg-gradient-to-b from-text-light/25 to-text-light/75 text-end dark:from-text-dark/75 dark:to-text-dark/25"
			/>
		</div>
	)
}
