import { useDebugValue, useEffect, useState } from "react"

const parse = (value: string) => {
	try {
		return JSON.parse(value)
	} catch {
		return value
	}
}

/**
 * Custom hook that provides a stateful value synchronized with `localStorage`.
 * It behaves similarly to `useState`, but persists the value in `localStorage`.
 *
 * @template T The type of the value to be stored.
 * @param {string} key The key under which the value is stored in `localStorage`.
 * @param {T | (() => T)} [fallbackValue] The initial value to use if no value is found in `localStorage`.
 *                                     Can be a value directly or a function that returns the value.
 * @returns {[T, React.Dispatch<React.SetStateAction<T>>]} A tuple containing:
 *  - The current persisted value.
 *  - A state setter function to update the value (which also updates `localStorage`).
 */
export function useLocalStorage<T>(
	key: string,
	fallbackValue?: T | (() => T)
): [T, React.Dispatch<React.SetStateAction<T>>] {
	const [value, setValue] = useState<T>(fallbackValue as T)
	useDebugValue(`${key} ${value}`)

	useEffect(() => {
		const item = localStorage.getItem(key)
		if (item) {
			setValue(parse(item))
		}
	}, [key])

	useEffect(() => {
		localStorage.setItem(key, JSON.stringify(value))
	}, [key, value])

	return [value, setValue]
}
