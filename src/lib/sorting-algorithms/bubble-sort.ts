import { SortingAlgorithm } from "./sorting-algorithm"

export class BubbleSort extends SortingAlgorithm {
	constructor() {
		super()
		this.label = "Bubble sort"
		this.content = `
		is a simple sorting algorithm that repeatedly steps through the input
		list element by element, comparing the current element with the one
		after it, swapping their values if needed
		`
		this.timeComplexity = {
			worst: "O(n²)",
			average: "O(n²)",
			best: "O(n)",
		}
		this.spaceComplexity = "O(n)"
	}

	sort(array: number[]) {
		for (let i = 0; i < array.length; i++) {
			for (let j = 0; j < array.length - 1 - i; j++) {
				this._trace.frames.push({
					arrayFrame: [...array],
					yellowFrame: [j, j + 1],
					sortedFrame: this._trace.lastSortedFrame,
				})
				if (array[j] > array[j + 1]) {
					this.swap(array, j, j + 1)
					this._trace.frames.push({
						arrayFrame: [...array],
						redFrame: [j, j + 1],
						sortedFrame: this._trace.lastSortedFrame,
					})
				}
			}
			this._trace.frames.push({
				arrayFrame: [...array],
				sortedFrame: [...this._trace.lastSortedFrame, array.length - 1 - i],
			})
		}
	}
}
