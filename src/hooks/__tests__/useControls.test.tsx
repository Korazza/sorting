import { renderHook, act } from "@testing-library/react"
import { describe, it, expect, beforeEach, afterEach, vi } from "vitest"
import React from "react"

import { useControls } from "../use-control"
import {
	AlgorithmContext,
	AlgorithmContextProps,
} from "../../contexts/algorithm"

// Helper to create a more complete mock AlgorithmContext value
const createMockAlgorithmContextValue = (
	framesCount = 10,
	initialBars = [5, 4, 3, 2, 1]
): AlgorithmContextProps => {
	const frames = Array.from({ length: framesCount }, (_, i) => ({
		arrayFrame: [...initialBars], // Each frame could have a different array state
		sortedFrame:
			i === framesCount - 1
				? Array.from({ length: initialBars.length }, (_, k) => k)
				: [],
		// Add other relevant frame properties if needed by useControls logic
		yellowFrame: [],
		redFrame: [],
		purpleFrame: [],
	}))

	const mockAlgorithmInstance = {
		label: "Mock Sort",
		content: "A mock sorting algorithm.",
		timeComplexity: { worst: "N/A", average: "N/A", best: "N/A" },
		spaceComplexity: "N/A",
		trace: {
			frames: frames,
			// lastSortedFrame is the sortedFrame of the last frame in the trace
			get lastSortedFrame() {
				return this.frames.length > 0
					? this.frames[this.frames.length - 1].sortedFrame
					: []
			},
		},
		run: vi.fn(),
		sort: vi.fn(),
		swap: vi.fn(),
	}

	return {
		algorithm: framesCount > 0 ? mockAlgorithmInstance : undefined,
		setAlgorithm: vi.fn(),
		initialBarValues: initialBars,
		framesCount: framesCount, // Kept for direct use if any, though algorithm.trace.frames.length is primary
		barsCount: initialBars.length,
		resetBars: vi.fn(),
	}
}

let mockAlgorithmContextValue: AlgorithmContextProps

const wrapper = ({ children }: { children: React.ReactNode }) => (
	<AlgorithmContext.Provider value={mockAlgorithmContextValue}>
		{children}
	</AlgorithmContext.Provider>
)

describe("useControls", () => {
	beforeEach(() => {
		// Default mock for most tests
		mockAlgorithmContextValue = createMockAlgorithmContextValue()
		vi.useFakeTimers()
	})

	afterEach(() => {
		vi.runOnlyPendingTimers()
		vi.useRealTimers()
	})

	it("should have correct initial state", () => {
		const { result } = renderHook(() => useControls(), { wrapper })
		expect(result.current.isPlaying).toBe(false)
		expect(result.current.step).toBe(0)
		expect(result.current.animationSpeed).toBe(500) // Default speed in ControlsContext
	})

	describe("play action", () => {
		it("should set isPlaying to true and advance step over time", () => {
			const { result } = renderHook(() => useControls(), { wrapper })
			expect(result.current.step).toBe(0)

			act(() => {
				result.current.play()
			})
			expect(result.current.isPlaying).toBe(true)

			act(() => {
				vi.advanceTimersByTime(result.current.animationSpeed)
			})
			expect(result.current.step).toBe(1)

			act(() => {
				vi.advanceTimersByTime(result.current.animationSpeed)
			})
			expect(result.current.step).toBe(2)
		})

		it("should not advance step if algorithm is undefined (e.g. framesCount 0 in mock)", () => {
			mockAlgorithmContextValue = createMockAlgorithmContextValue(0) // 0 frames results in undefined algorithm
			const { result } = renderHook(() => useControls(), { wrapper })
			act(() => {
				result.current.play()
			})
			// isPlaying should remain false as play() has an early exit if !algorithm
			expect(result.current.isPlaying).toBe(false)
			act(() => {
				vi.advanceTimersByTime(result.current.animationSpeed)
			})
			expect(result.current.step).toBe(0)
		})

		it("should pause when the last step is reached", () => {
			mockAlgorithmContextValue = createMockAlgorithmContextValue(2) // 2 frames (step 0, step 1)
			const { result } = renderHook(() => useControls(), { wrapper })

			act(() => {
				result.current.play()
			})
			expect(result.current.isPlaying).toBe(true)

			act(() => {
				vi.advanceTimersByTime(result.current.animationSpeed)
			}) // Moves to step 1
			expect(result.current.step).toBe(1)
			// At this point, frame.current becomes algorithm.trace.frames[1]
			// The sortedFrame of frames[1] is fully sorted in the mock.
			// The play interval checks: algorithm.trace.lastSortedFrame.length !== frame.current.sortedFrame.length
			// This condition becomes false, so pause() is called.

			// To test this, we need to let another interval tick happen if pause is async or step update is async
			act(() => {
				vi.advanceTimersByTime(result.current.animationSpeed)
			})
			expect(result.current.step).toBe(1) // Stays at step 1
			expect(result.current.isPlaying).toBe(false) // Should automatically pause
		})
	})

	it("pause action should set isPlaying to false", () => {
		const { result } = renderHook(() => useControls(), { wrapper })
		// Ensure it can actually play first
		if (!mockAlgorithmContextValue.algorithm)
			throw new Error("Algorithm undefined in mock")

		act(() => {
			result.current.play()
		})
		// Only assert isPlaying if play actually started.
		if (result.current.isPlaying) {
			act(() => {
				result.current.pause()
			})
			expect(result.current.isPlaying).toBe(false)
		} else {
			// If play didn't start (e.g. due to conditions in play()), then pause has no effect on isPlaying
			expect(result.current.isPlaying).toBe(false)
		}
	})

	describe("stepForward action", () => {
		it("should increment step by 1", () => {
			const { result } = renderHook(() => useControls(), { wrapper })
			act(() => {
				result.current.stepForward()
			})
			expect(result.current.step).toBe(1)
		})

		it("should not increment step beyond algorithm.trace.frames.length - 1", () => {
			mockAlgorithmContextValue = createMockAlgorithmContextValue(2) // 2 frames
			const { result } = renderHook(() => useControls(), { wrapper })
			act(() => {
				result.current.stepForward()
			}) // step becomes 1
			expect(result.current.step).toBe(1)
			act(() => {
				result.current.stepForward()
			}) // try to step forward again
			expect(result.current.step).toBe(1)
		})

		it("should do nothing if algorithm is not defined", () => {
			mockAlgorithmContextValue = createMockAlgorithmContextValue(0)
			const { result } = renderHook(() => useControls(), { wrapper })
			act(() => {
				result.current.stepForward()
			})
			expect(result.current.step).toBe(0)
		})
	})

	describe("stepBackward action", () => {
		it("should decrement step by 1 if algorithm exists", () => {
			const { result } = renderHook(() => useControls(), { wrapper })
			act(() => {
				result.current.stepForward()
			})
			act(() => {
				result.current.stepForward()
			})
			expect(result.current.step).toBe(2)

			act(() => {
				result.current.stepBackward()
			})
			expect(result.current.step).toBe(1)
		})

		it("should not decrement step below 0", () => {
			const { result } = renderHook(() => useControls(), { wrapper })
			act(() => {
				result.current.stepBackward()
			})
			expect(result.current.step).toBe(0)
		})
	})

	describe("forward action", () => {
		it("should set step to algorithm.trace.frames.length - 1", () => {
			const { result } = renderHook(() => useControls(), { wrapper })
			act(() => {
				result.current.forward()
			})
			expect(result.current.step).toBe(
				mockAlgorithmContextValue.algorithm!.trace.frames.length - 1
			)
		})

		it("should set step to 0 if algorithm is not defined", () => {
			mockAlgorithmContextValue = createMockAlgorithmContextValue(0)
			const { result } = renderHook(() => useControls(), { wrapper })
			act(() => {
				result.current.forward()
			})
			expect(result.current.step).toBe(0)
		})
	})

	it("backward action should set step to 0 if algorithm exists", () => {
		const { result } = renderHook(() => useControls(), { wrapper })
		act(() => {
			result.current.stepForward()
		})
		act(() => {
			result.current.stepForward()
		})
		expect(result.current.step).toBe(2)

		act(() => {
			result.current.backward()
		})
		expect(result.current.step).toBe(0)
	})

	it("reset action should reset state and call resetBars", () => {
		const { result } = renderHook(() => useControls(), { wrapper })
		act(() => {
			result.current.play()
		})
		// Check if playing before advancing time, as play might not start if conditions aren't met
		if (result.current.isPlaying) {
			act(() => {
				vi.advanceTimersByTime(result.current.animationSpeed)
			})
		}

		act(() => {
			result.current.reset()
		})
		expect(result.current.isPlaying).toBe(false)
		expect(result.current.step).toBe(0)
		expect(mockAlgorithmContextValue.resetBars).toHaveBeenCalled()
	})

	it("setAnimationSpeed action should update animationSpeed", () => {
		const { result } = renderHook(() => useControls(), { wrapper })
		const newSpeed = 1000
		act(() => {
			result.current.setAnimationSpeed(newSpeed)
		})
		expect(result.current.animationSpeed).toBe(newSpeed)
	})
})
