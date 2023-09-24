import { useDebugValue, useEffect, useState } from "react"

const parse = (value: string) => {
	try {
		return JSON.parse(value)
	} catch {
		return value
	}
}

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
