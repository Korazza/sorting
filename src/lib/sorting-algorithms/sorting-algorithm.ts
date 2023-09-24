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

export abstract class SortingAlgorithm {
	protected _trace: Trace
	label: AlgorithmLabel
	content: string
	timeComplexity: TimeComplexity
	spaceComplexity: string

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

	abstract sort(array: number[], start?: number, end?: number): void

	get trace() {
		return this._trace
	}

	swap(array: number[], i: number, j: number) {
		const tmp = array[i]
		array[i] = array[j]
		array[j] = tmp
	}

	run(array: number[]): Frame[] {
		const tmpArray = array.slice()
		this._trace = new Trace()
		this.sort(tmpArray, 0, tmpArray.length - 1)

		if (this._trace.lastSortedFrame.length < array.length) {
			this._trace.frames.push({
				arrayFrame: [...tmpArray],
				sortedFrame: [...array.map((_, i) => i)],
			})
		}

		return this._trace.frames
	}
}
