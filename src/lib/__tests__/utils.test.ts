import { describe, it, expect } from "vitest"
import { getRandom, milliseconds2Minutes } from "../utils"

describe("getRandom", () => {
	it("should return a number", () => {
		expect(typeof getRandom(1, 10)).toBe("number")
	})

	it("should return a number within the specified min/max range", () => {
		const min = 1
		const max = 10
		for (let i = 0; i < 100; i++) {
			const randomNum = getRandom(min, max)
			expect(randomNum).toBeGreaterThanOrEqual(min)
			expect(randomNum).toBeLessThanOrEqual(max)
		}
	})

	it("should return the correct number when min === max", () => {
		expect(getRandom(5, 5)).toBe(5)
	})

	it("should work with negative ranges", () => {
		const min = -10
		const max = -1
		for (let i = 0; i < 100; i++) {
			const randomNum = getRandom(min, max)
			expect(randomNum).toBeGreaterThanOrEqual(min)
			expect(randomNum).toBeLessThanOrEqual(max)
		}
	})

	it("should return an integer", () => {
		expect(Number.isInteger(getRandom(1, 10))).toBe(true)
	})
})

describe("milliseconds2Minutes", () => {
	it('should convert 0 ms to "00:00"', () => {
		expect(milliseconds2Minutes(0)).toBe("00:00")
	})

	it('should convert 1000 ms (1s) to "00:01"', () => {
		expect(milliseconds2Minutes(1000)).toBe("00:01")
	})

	it('should convert 59000 ms (59s) to "00:59"', () => {
		expect(milliseconds2Minutes(59000)).toBe("00:59")
	})

	it('should convert 60000 ms (1min) to "01:00"', () => {
		expect(milliseconds2Minutes(60000)).toBe("01:00")
	})

	it('should convert 61000 ms (1min 1s) to "01:01"', () => {
		expect(milliseconds2Minutes(61000)).toBe("01:01")
	})

	it('should convert 3599000 ms (59min 59s) to "59:59"', () => {
		expect(milliseconds2Minutes(3599000)).toBe("59:59")
	})

	it('should convert 3600000 ms (1hr) to "00:00"', () => {
		// Based on (totalSeconds / 60) % 60 for minutes
		expect(milliseconds2Minutes(3600000)).toBe("00:00")
	})

	it("should handle fractional seconds correctly (rounding down for seconds part)", () => {
		expect(milliseconds2Minutes(1500)).toBe("00:01") // 1.5s
		expect(milliseconds2Minutes(1999)).toBe("00:01") // 1.999s
	})
})
