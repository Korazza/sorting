import { useContext } from "react"

import { AlgorithmContext, AlgorithmContextProps } from "@/contexts/algorithm"

/**
 * Custom hook for accessing the algorithm state from `AlgorithmContext`.
 *
 * This hook provides direct access to the context value, which includes:
 * - `algorithm`: The currently selected sorting algorithm instance (or undefined if not set).
 * - `setAlgorithm`: A function to set the current sorting algorithm.
 * - `initialBarValues`: An array of numbers representing the initial state for visualization.
 * - `framesCount`: The total number of animation frames for the current algorithm and data.
 *
 * It's a shorthand for `useContext(AlgorithmContext)`.
 * Ensure this hook is used within a component tree wrapped by `AlgorithmProvider`.
 *
 * @returns {AlgorithmContextProps} The algorithm context value.
 * @see {@link AlgorithmContext}
 * @see {@link AlgorithmProvider}
 */
export const useAlgorithm = (): AlgorithmContextProps =>
	useContext(AlgorithmContext)
