import clsx, { ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

/**
 * Utility function to merge Tailwind CSS classes with clsx, resolving conflicts.
 * It combines class names and then merges them using tailwind-merge to handle
 * Tailwind's utility class system correctly (e.g., overriding conflicting classes).
 *
 * @param {...ClassValue[]} args - A list of class values (strings, arrays, or objects).
 * @returns {string} A string of combined and merged class names.
 */
export const cn = (...args: ClassValue[]) => twMerge(clsx(args))

/**
 * Generates a random integer between a minimum and maximum value (inclusive).
 *
 * @param {number} min - The minimum possible value (inclusive).
 * @param {number} max - The maximum possible value (inclusive).
 * @returns {number} A random integer within the specified range.
 */
export const getRandom = (min: number, max: number) => {
	min = Math.ceil(min)
	max = Math.floor(max)
	return Math.floor(Math.random() * (max - min + 1)) + min
}

/**
 * Converts a duration from milliseconds to a "MM:SS" string format.
 * Note: The parameter name `timeInSeconds` is misleading; it actually expects milliseconds.
 *
 * @param {number} timeInMilliseconds - The time duration in milliseconds.
 * @returns {string} A string representing the time in "MM:SS" format.
 */
export const milliseconds2Minutes = (timeInMilliseconds: number) => {
	const pad = (num: number, size: number) => {
			return ("000" + num).slice(size * -1)
		},
		// Correctly interpret input as milliseconds
		timeInTotalSeconds = Number((timeInMilliseconds / 1000).toFixed(3)),
		minutes = Math.floor(timeInTotalSeconds / 60) % 60,
		seconds = Math.floor(timeInTotalSeconds - minutes * 60)

	return pad(minutes, 2) + ":" + pad(seconds, 2)
}
