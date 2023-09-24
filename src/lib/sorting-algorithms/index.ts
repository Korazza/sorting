import { AlgorithmLabel, SortingAlgorithm } from "./sorting-algorithm"
import { BubbleSort } from "./bubble-sort"
import { InsertionSort } from "./insertion-sort"
import { MergeSort } from "./merge-sort"
import { QuickSort } from "./quick-sort"

export { SortingAlgorithm } from "./sorting-algorithm"
export { BubbleSort } from "./bubble-sort"
export { InsertionSort } from "./insertion-sort"
export { MergeSort } from "./merge-sort"
export { QuickSort } from "./quick-sort"

export const ALGORITHMS: SortingAlgorithm[] = [
	new BubbleSort(),
	new InsertionSort(),
	new MergeSort(),
	new QuickSort(),
]

export const ALGORITHM_LABELS: AlgorithmLabel[] = [
	"Bubble sort",
	"Insertion sort",
	"Merge sort",
	"Quick sort",
]

export const findByLabel = (algorithmLabel: string) =>
	ALGORITHMS.filter((algorithm) => algorithm.label === algorithmLabel)
