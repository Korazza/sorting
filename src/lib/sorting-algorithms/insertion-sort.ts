import { SortingAlgorithm } from "./sorting-algorithm"

export class InsertionSort extends SortingAlgorithm {
	constructor() {
		super()
		this.label = "Insertion sort"
		this.content = `
		is a simple sorting algorithm that builds the final
		sorted array one item at a time by comparisons
		`
		this.timeComplexity = {
			worst: "O(n²)",
			average: "O(n²)",
			best: "O(n)",
		}
		this.spaceComplexity = "O(n)"
	}

	sort(array: number[]): void {
		for (let i = 1; i < array.length; ++i) {
			const insert = array[i]
			this._trace.frames.push({
				arrayFrame: [...array],
				purpleFrame: [i],
				sortedFrame: this._trace.lastSortedFrame,
			})
			let j = i - 1
			for (; j >= 0 && array[j] > insert; --j) {
				this._trace.frames.push({
					arrayFrame: [...array],
					yellowFrame: [j],
					purpleFrame: [i],
					sortedFrame: this._trace.lastSortedFrame,
				})
				array[j + 1] = array[j]
				this._trace.frames.push({
					arrayFrame: [...array],
					redFrame: [j + 1],
					purpleFrame: [i],
					sortedFrame: this._trace.lastSortedFrame,
				})
			}
			array[j + 1] = insert
			this._trace.frames.push({
				arrayFrame: [...array],
				redFrame: [j + 1],
				purpleFrame: [i],
				sortedFrame: this._trace.lastSortedFrame,
			})
		}
		this._trace.frames.push({
			arrayFrame: [...array],
			sortedFrame: [...array.map((_, i) => i)],
		})
	}
}
