import { useContext } from "react"

import { ControlsContext } from "@/contexts/controls"

export const useControls = () => useContext(ControlsContext)
