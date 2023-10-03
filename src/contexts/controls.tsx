import {
	PropsWithChildren,
	createContext,
	useCallback,
	useEffect,
	useRef,
	useState,
} from "react"

import { useAlgorithm } from "@/hooks/use-algorithm"
import { Frame } from "@/types"

type ControlsContextType = {
	isPlaying: boolean
	isSorted: boolean
	step: number
	frame: Frame | undefined
	animationSpeed: number
	setAnimationSpeed: React.Dispatch<
		React.SetStateAction<ControlsContextType["animationSpeed"]>
	>
	reset: () => void
	backward: () => void
	stepBackward: () => void
	play: () => void
	pause: () => void
	stepForward: () => void
	forward: () => void
}

export const ControlsContext = createContext<ControlsContextType>({
	isPlaying: false,
	isSorted: false,
	step: 0,
	frame: undefined,
	animationSpeed: 500,
	setAnimationSpeed: () => {},
	reset: () => {},
	backward: () => {},
	stepBackward: () => {},
	play: () => {},
	pause: () => {},
	stepForward: () => {},
	forward: () => {},
})

export const ControlsProvider = ({ ...props }: PropsWithChildren) => {
	const [isPlaying, setIsPlaying] =
		useState<ControlsContextType["isPlaying"]>(false)
	const [isSorted, setIsSorted] =
		useState<ControlsContextType["isSorted"]>(false)
	const [step, setStep] = useState(0)
	const intervalId = useRef<NodeJS.Timeout>()
	const isBackward = useRef(false)
	const frame = useRef<Frame>()
	const [animationSpeed, setAnimationSpeed] = useState(500)

	const { algorithm, barsCount, resetBars } = useAlgorithm()

	const reset = useCallback(() => {
		setIsPlaying(false)
		setStep(0)
		isBackward.current = false
		clearInterval(intervalId.current)
		intervalId.current = undefined
		resetBars()
	}, [resetBars])

	const backward = () => {
		if (algorithm) {
			if (isPlaying) {
				pause()
			}
			setStep(0)
			frame.current = algorithm.trace.frames[0]
		}
	}

	const stepBackward = () => {
		if (algorithm) {
			if (isPlaying) {
				pause()
			}
			if (step > 0) {
				isBackward.current = true
				setStep((prevStep) => prevStep - 1)
			}
		}
	}

	const play = () => {
		if (
			algorithm &&
			frame.current &&
			algorithm.trace.lastSortedFrame.length !==
				frame.current.sortedFrame.length
		) {
			isBackward.current = false
			setIsPlaying(true)
			intervalId.current = setInterval(() => {
				if (
					algorithm &&
					frame.current &&
					algorithm.trace.lastSortedFrame.length !==
						frame.current.sortedFrame.length
				) {
					setStep((prevStep) => prevStep + 1)
				} else {
					pause()
				}
			}, animationSpeed)
		}
	}

	const pause = () => {
		setIsPlaying(false)
		clearInterval(intervalId.current)
		intervalId.current = undefined
	}

	const stepForward = () => {
		if (algorithm) {
			if (isPlaying) {
				pause()
			}
			if (step < algorithm.trace.frames.length - 1) {
				isBackward.current = false
				setStep((prevStep) => prevStep + 1)
			}
		}
	}

	const forward = () => {
		if (algorithm) {
			if (isPlaying) {
				pause()
			}
			setStep(algorithm.trace.frames.length - 1)
			frame.current = algorithm.trace.frames[algorithm.trace.frames.length - 1]
		}
	}

	useEffect(() => {
		setIsSorted(
			Boolean(
				algorithm &&
					frame.current &&
					algorithm.trace.lastSortedFrame.length ===
						frame.current.sortedFrame.length
			)
		)
	}, [algorithm, frame, step])

	useEffect(() => {
		if (algorithm) {
			frame.current = algorithm.trace.frames[step]
		}
	}, [algorithm, step])

	useEffect(() => {
		reset()
	}, [barsCount, reset])

	return (
		<ControlsContext.Provider
			value={{
				isPlaying,
				isSorted,
				step,
				frame: frame.current,
				animationSpeed,
				setAnimationSpeed,
				reset,
				backward,
				stepBackward,
				play,
				pause,
				stepForward,
				forward,
			}}
			{...props}
		/>
	)
}
