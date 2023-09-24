import { useContext } from "react"

import { AlgorithmContext } from "@/contexts/algorithm"

export const useAlgorithm = () => useContext(AlgorithmContext)
