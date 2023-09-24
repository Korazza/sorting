import { Frame } from "@/types"

export class Trace {
	private _frames: Frame[]

	constructor() {
		this._frames = [
			{
				arrayFrame: [],
				yellowFrame: [],
				redFrame: [],
				purpleFrame: [],
				sortedFrame: [],
			},
		]
	}

	set frames(frames: Frame[]) {
		this._frames = frames
	}

	get frames() {
		return this._frames
	}

	get lastSortedFrame() {
		return this._frames[this._frames.length - 1].sortedFrame
	}
}
