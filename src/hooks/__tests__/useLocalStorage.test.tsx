import { renderHook, act } from "@testing-library/react"
import { describe, it, expect, beforeEach, vi } from "vitest"
import { useLocalStorage } from "../use-local-storage" // Adjusted path

// Mock localStorage
let store: { [key: string]: string } = {}
const mockLocalStorage = {
	getItem: vi.fn((key: string): string | null => store[key] || null),
	setItem: vi.fn((key: string, value: string) => {
		store[key] = value.toString()
	}),
	removeItem: vi.fn((key: string) => {
		delete store[key]
	}),
	clear: vi.fn(() => {
		store = {}
	}),
}

Object.defineProperty(window, "localStorage", { value: mockLocalStorage })

describe("useLocalStorage", () => {
	beforeEach(() => {
		store = {} // Clear mock localStorage before each test
		// vi.clearAllMocks(); // Clear mock function calls if needed, but store reset is primary
	})

	it("should return initialValue when localStorage is empty", () => {
		const { result } = renderHook(() => useLocalStorage("testKey", "initial"))
		expect(result.current[0]).toBe("initial")
		expect(mockLocalStorage.getItem).toHaveBeenCalledWith("testKey")
	})

	it("should return stored value when localStorage has a value for the key", () => {
		store["testKey"] = JSON.stringify("storedValue")
		const { result } = renderHook(() => useLocalStorage("testKey", "initial"))
		expect(result.current[0]).toBe("storedValue")
		expect(mockLocalStorage.getItem).toHaveBeenCalledWith("testKey")
	})

	it("should update the value and localStorage when setValue is called", () => {
		const { result } = renderHook(() => useLocalStorage("testKey", "initial"))

		act(() => {
			result.current[1]("newValue")
		})

		expect(result.current[0]).toBe("newValue")
		expect(mockLocalStorage.setItem).toHaveBeenCalledWith(
			"testKey",
			JSON.stringify("newValue")
		)
		expect(store["testKey"]).toBe(JSON.stringify("newValue"))
	})

	it("should update with a function updater", () => {
		const { result } = renderHook(() => useLocalStorage("testKey", 10)) // Initial value is a number

		act(() => {
			result.current[1]((prevValue) => prevValue + 5)
		})

		expect(result.current[0]).toBe(15)
		expect(mockLocalStorage.setItem).toHaveBeenCalledWith(
			"testKey",
			JSON.stringify(15)
		)
		expect(store["testKey"]).toBe(JSON.stringify(15))
	})

	it("should handle object types correctly", () => {
		const initialObj = { name: "test", value: 123 }
		const { result } = renderHook(() => useLocalStorage("objKey", initialObj))

		expect(result.current[0]).toEqual(initialObj)

		const newObj = { name: "updated", value: 456 }
		act(() => {
			result.current[1](newObj)
		})

		expect(result.current[0]).toEqual(newObj)
		expect(mockLocalStorage.setItem).toHaveBeenCalledWith(
			"objKey",
			JSON.stringify(newObj)
		)
		expect(JSON.parse(store["objKey"])).toEqual(newObj)
	})

	it("should handle boolean types correctly", () => {
		const { result } = renderHook(() => useLocalStorage("boolKey", true))
		expect(result.current[0]).toBe(true)

		act(() => {
			result.current[1](false)
		})
		expect(result.current[0]).toBe(false)
		expect(mockLocalStorage.setItem).toHaveBeenCalledWith(
			"boolKey",
			JSON.stringify(false)
		)
		expect(JSON.parse(store["boolKey"])).toBe(false)
	})

	it("should use fallback function for initial value if provided and no stored value", () => {
		const fallbackFn = vi.fn(() => "fallbackValue")
		const { result } = renderHook(() => useLocalStorage("testKey", fallbackFn))
		expect(result.current[0]).toBe("fallbackValue")
		expect(fallbackFn).toHaveBeenCalled() // Check if fallback function was called
		// The initial useEffect will then save this fallbackValue to localStorage
		expect(mockLocalStorage.setItem).toHaveBeenCalledWith(
			"testKey",
			JSON.stringify("fallbackValue")
		)
	})
})
