import { describe, it, expect } from "vitest"
import { InsertionSort } from "../insertion-sort"

describe("InsertionSort", () => {
	it("should sort an empty array", () => {
		const sorter = new InsertionSort()
		const arr: number[] = []
		sorter.run(arr)
		expect(arr).toEqual([])
	})

	it("should sort an already sorted array", () => {
		const sorter = new InsertionSort()
		const arr = [1, 2, 3, 4, 5]
		sorter.run(arr)
		expect(arr).toEqual([1, 2, 3, 4, 5])
	})

	it("should sort a reverse sorted array", () => {
		const sorter = new InsertionSort()
		const arr = [5, 4, 3, 2, 1]
		sorter.run(arr)
		expect(arr).toEqual([1, 2, 3, 4, 5])
	})

	it("should sort an array with duplicate elements", () => {
		const sorter = new InsertionSort()
		const arr = [3, 1, 4, 1, 5, 9, 2, 6, 5, 3, 5]
		sorter.run(arr)
		expect(arr).toEqual([1, 1, 2, 3, 3, 4, 5, 5, 5, 6, 9])
	})

	it("should sort an array with negative numbers", () => {
		const sorter = new InsertionSort()
		const arr = [-5, 5, -1, 0, 10, -10]
		sorter.run(arr)
		expect(arr).toEqual([-10, -5, -1, 0, 5, 10])
	})

	it("should handle an array with a single element", () => {
		const sorter = new InsertionSort()
		const arr = [42]
		sorter.run(arr)
		expect(arr).toEqual([42])
	})
})
