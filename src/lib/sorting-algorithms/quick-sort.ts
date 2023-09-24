import { SortingAlgorithm } from "./sorting-algorithm"

export class QuickSort extends SortingAlgorithm {
	constructor() {
		super()
		this.label = "Quick sort"
		this.content = `
		is a sorting algorithm that picks an element as a
		pivot and partitions the given array arround the
		picked pivot by placing the pivot in its correct
		position in the sorted array
		`
		this.timeComplexity = {
			worst: "O(n²)",
			average: "O(n log n)",
			best: "O(n log n)",
		}
		this.spaceComplexity = "O(n)"
	}

	partition(array: number[], start: number, end: number) {
		const pivotValue = array[start]
		let pivotIndex = start
		this._trace.frames.push({
			arrayFrame: [...array],
			purpleFrame: [pivotIndex],
			sortedFrame: this._trace.lastSortedFrame,
		})
		for (let i = start + 1; i <= end; i++) {
			this._trace.frames.push({
				arrayFrame: [...array],
				yellowFrame: [i],
				purpleFrame: [pivotIndex],
				sortedFrame: this._trace.lastSortedFrame,
			})
			if (array[i] < pivotValue) {
				pivotIndex++
				this.swap(array, i, pivotIndex)
				this._trace.frames.push({
					arrayFrame: [...array],
					redFrame: [i],
					purpleFrame: [pivotIndex],
					sortedFrame: this._trace.lastSortedFrame,
				})
			}
		}
		this.swap(array, start, pivotIndex)
		if (pivotIndex !== start)
			this._trace.frames.push({
				arrayFrame: [...array],
				redFrame: [start],
				purpleFrame: [pivotIndex],
				sortedFrame: this._trace.lastSortedFrame,
			})
		return pivotIndex
	}

	sort(array: number[], start: number, end: number) {
		if (start >= end) {
			if (start === end)
				this._trace.frames.push({
					arrayFrame: [...array],
					sortedFrame: [...this._trace.lastSortedFrame, start],
				})
			return
		}
		const index = this.partition(array, start, end)
		this._trace.frames.push({
			arrayFrame: [...array],
			sortedFrame: [...this._trace.lastSortedFrame, index],
		})
		this.sort(array, start, index - 1)
		this.sort(array, index + 1, end)
	}
}
