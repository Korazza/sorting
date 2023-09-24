import { SortingAlgorithm } from "./sorting-algorithm"

export class MergeSort extends SortingAlgorithm {
	constructor() {
		super()
		this.label = "Merge sort"
		this.content = `
		is a sorting algorithm that works by dividing an array
		into smaller subarrays, and then merging the sorted
		subarrays back together to form the final sorted array
		`
		this.timeComplexity = {
			worst: "O(n log n)",
			average: "O(n log n)",
			best: "Ω(n log n)",
		}
		this.spaceComplexity = "O(n)"
	}

	merge(array: number[], start: number, mid: number, end: number) {
		const n = end - start + 1
		const tmpArray = []
		let left = start,
			right = mid + 1,
			index = 0
		while (left <= mid && right <= end)
			tmpArray[index++] =
				array[left] <= array[right] ? array[left++] : array[right++]
		while (left <= mid) tmpArray[index++] = array[left++]
		while (right <= end) tmpArray[index++] = array[right++]
		for (let k = 0; k < n; k++) {
			array[start + k] = tmpArray[k]
			this._trace.frames.push({
				arrayFrame: [...array],
				redFrame: [start + k],
				sortedFrame: this._trace.lastSortedFrame,
			})
		}
	}

	sort(array: number[], start: number = 0, end: number = array.length - 1) {
		if (start < end) {
			this._trace.frames.push({
				arrayFrame: [...array],
				yellowFrame: [...array.slice(start, end + 1).map((_, i) => i + start)],
				sortedFrame: this._trace.lastSortedFrame,
			})
			const mid = Math.floor((start + end) / 2)
			this.sort(array, start, mid)
			this.sort(array, mid + 1, end)
			this.merge(array, start, mid, end)
		}
	}
}
