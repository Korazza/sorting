import { Frame } from "@/types"

/**
 * Represents a trace of an algorithm's execution, primarily for visualization purposes.
 * It collects frames, where each frame captures a snapshot of the algorithm's state
 * at a particular step (e.g., array state, highlighted elements).
 */
export class Trace {
	/** @private Internal store for the animation frames. */
	private _frames: Frame[]

	/**
	 * Initializes a new Trace instance.
	 * The trace starts with a default initial empty frame.
	 */
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

	/**
	 * Sets the entire collection of frames for the trace.
	 * @param {Frame[]} frames - An array of Frame objects.
	 */
	set frames(frames: Frame[]) {
		this._frames = frames
	}

	/**
	 * Gets the entire collection of frames currently stored in the trace.
	 * @returns {Frame[]} An array of Frame objects.
	 */
	get frames() {
		return this._frames
	}

	/**
	 * Gets the `sortedFrame` array from the very last frame in the trace.
	 * This typically represents the indices of elements that are considered sorted
	 * at the end of that particular step or the entire animation.
	 * @returns {number[]} An array of numbers representing sorted indices.
	 */
	get lastSortedFrame() {
		return this._frames[this._frames.length - 1].sortedFrame
	}
}
