import clsx, { ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export const cn = (...args: ClassValue[]) => twMerge(clsx(args))

export const getRandom = (min: number, max: number) => {
	min = Math.ceil(min)
	max = Math.floor(max)
	return Math.floor(Math.random() * (max - min + 1)) + min
}

export const milliseconds2Minutes = (timeInSeconds: number) => {
	const pad = (num: number, size: number) => {
			return ("000" + num).slice(size * -1)
		},
		time = Number((timeInSeconds / 1000).toFixed(3)),
		minutes = Math.floor(time / 60) % 60,
		seconds = Math.floor(time - minutes * 60)

	return pad(minutes, 2) + ":" + pad(seconds, 2)
}
