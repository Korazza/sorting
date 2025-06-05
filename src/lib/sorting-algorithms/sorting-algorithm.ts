import { Frame } from "@/types"
import { Trace } from "../trace"

export type AlgorithmLabel =
	| "Bubble sort"
	| "Insertion sort"
	| "Merge sort"
	| "Quick sort"
	| undefined

export type TimeComplexity = {
	worst: string
	average: string
	best: string
}

/**
 * Abstract base class for sorting algorithms.
 * Provides a common structure and utility methods for various sorting algorithm implementations.
 * Subclasses are expected to implement the `sort` method.
 */
export abstract class SortingAlgorithm {
	/**
	 * @protected Instance of Trace used to record animation frames during sorting.
	 */
	protected _trace: Trace
	/** Name of the sorting algorithm (e.g., "Bubble sort"). */
	label: AlgorithmLabel
	/** Textual description of the algorithm. */
	content: string
	/** Object detailing the time complexity in worst, average, and best cases. */
	timeComplexity: TimeComplexity
	/** String describing the space complexity of the algorithm. */
	spaceComplexity: string

	/**
	 * Initializes common properties for a sorting algorithm.
	 * Sets up an empty trace, and default empty strings for content and complexities.
	 */
	constructor() {
		this._trace = new Trace()
		this.content = ""
		this.timeComplexity = {
			worst: "",
			average: "",
			best: "",
		}
		this.spaceComplexity = ""
	}

	/**
	 * Abstract sort method to be implemented by specific algorithm subclasses.
	 * This method should contain the core logic of the sorting algorithm and
	 * should use `this._trace` to record frames for visualization.
	 *
	 * @abstract
	 * @param {number[]} array - The array of numbers to be sorted.
	 * @param {number} [start] - Optional starting index for sorting (used in some algorithms like QuickSort).
	 * @param {number} [end] - Optional ending index for sorting.
	 */
	abstract sort(array: number[], start?: number, end?: number): void

	/**
	 * Gets the Trace instance associated with this algorithm.
	 * @returns {Trace} The trace object containing animation frames.
	 */
	get trace() {
		return this._trace
	}

	/**
	 * Swaps two elements in an array.
	 *
	 * @param {number[]} array - The array in which elements are swapped.
	 * @param {number} i - The index of the first element.
	 * @param {number} j - The index of the second element.
	 */
	swap(array: number[], i: number, j: number) {
		const tmp = array[i]
		array[i] = array[j]
		array[j] = tmp
	}

	/**
	 * Runs the sorting algorithm on a given array and returns the animation frames.
	 * It creates a copy of the input array to avoid modifying it directly during the
	 * sort logic that generates frames, then copies the sorted result back to the
	 * original array reference to reflect the sort in-place from the caller's perspective.
	 *
	 * @param {number[]} array - The array of numbers to be sorted. This array will be sorted in-place.
	 * @returns {Frame[]} An array of Frame objects representing the visualization of the sort.
	 */
	run(array: number[]): Frame[] {
		const tmpArray = array.slice()
		this._trace = new Trace() // Reset trace for each run
		this.sort(tmpArray, 0, tmpArray.length - 1)

		// Copy sorted elements back to the original array reference
		array.length = 0
		Array.prototype.push.apply(array, tmpArray)

		if (this._trace.lastSortedFrame.length < array.length) {
			this._trace.frames.push({
				arrayFrame: [...tmpArray],
				sortedFrame: [...array.map((_, i) => i)],
			})
		}

		return this._trace.frames
	}
}
