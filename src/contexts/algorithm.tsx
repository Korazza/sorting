import {
	PropsWithChildren,
	createContext,
	useCallback,
	useEffect,
	useState,
} from "react"

import { useBreakpoint } from "@/hooks/use-breakpoint"
import { SortingAlgorithm } from "@/lib/sorting-algorithms"
import { getRandom } from "@/lib/utils"

export type AlgorithmContextType = {
	initialBarValues: number[]
	resetBars: () => void
	algorithm: SortingAlgorithm | undefined
	setAlgorithm: React.Dispatch<
		React.SetStateAction<AlgorithmContextType["algorithm"]>
	>
	barsCount: number
	framesCount: number
}

export const AlgorithmContext = createContext<AlgorithmContextType>({
	initialBarValues: [],
	resetBars: () => {},
	algorithm: undefined,
	setAlgorithm: () => {},
	barsCount: 0,
	framesCount: 0,
})

export const AlgorithmProvider: React.FC<PropsWithChildren> = (props) => {
	const [barsCount, setBarsCount] = useState(0)
	const [initialBarValues, setInitialBarValues] = useState<
		AlgorithmContextType["initialBarValues"]
	>([])
	const [algorithm, setAlgorithm] =
		useState<AlgorithmContextType["algorithm"]>()
	const [framesCount, setFramesCount] =
		useState<AlgorithmContextType["framesCount"]>(0)
	const { isAbove: isAboveXl } = useBreakpoint("xl")
	const { isAbove: isAboveLg } = useBreakpoint("lg")
	const { isAbove: isAboveMd } = useBreakpoint("md")

	const resetBars = useCallback(() => {
		const tmpBars = []
		for (let i = 0; i < barsCount; i++) {
			tmpBars.push(getRandom(0, 100))
		}
		setInitialBarValues(tmpBars)
	}, [barsCount])

	useEffect(() => {
		if (algorithm) {
			algorithm.trace.frames = algorithm.run(initialBarValues)
			setFramesCount(algorithm.trace.frames.length)
		}
	}, [algorithm, initialBarValues])

	useEffect(() => {
		if (isAboveXl) {
			setBarsCount(30)
		} else if (isAboveLg) {
			setBarsCount(24)
		} else if (isAboveMd) {
			setBarsCount(18)
		} else {
			setBarsCount(12)
		}
		resetBars()
	}, [isAboveMd, isAboveLg, isAboveXl, resetBars])

	return (
		<AlgorithmContext.Provider
			value={{
				initialBarValues,
				resetBars,
				algorithm,
				setAlgorithm,
				barsCount,
				framesCount,
			}}
			{...props}
		/>
	)
}
