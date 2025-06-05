import { useContext } from "react"

import { ControlsContext, ControlsContextProps } from "@/contexts/controls"

/**
 * Custom hook for accessing the controls state from `ControlsContext`.
 *
 * This hook provides direct access to the context value, which includes:
 * - `isPlaying`: Boolean indicating if the animation is currently playing.
 * - `play`: Function to start or resume the animation.
 * - `pause`: Function to pause the animation.
 * - `reset`: Function to reset the animation and algorithm state.
 * - `backward`: Function to jump to the beginning of the animation.
 * - `stepBackward`: Function to step one frame backward in the animation.
 * - `stepForward`: Function to step one frame forward in the animation.
 * - `forward`: Function to jump to the end of the animation.
 * - `step`: The current step/frame number in the animation.
 * - `setStep`: Function to set the current step/frame number.
 * - `animationSpeed`: The current speed of the animation.
 * - `setSpeed`: Function to set the animation speed.
 *
 * It's a shorthand for `useContext(ControlsContext)`.
 * Ensure this hook is used within a component tree wrapped by `ControlsProvider`.
 *
 * @returns {ControlsContextProps} The controls context value.
 * @see {@link ControlsContext}
 * @see {@link ControlsProvider}
 */
export const useControls = (): ControlsContextProps =>
	useContext(ControlsContext)
