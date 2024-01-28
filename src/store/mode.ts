import { atomWithStorage } from 'jotai/utils'
import type { Mode } from '../types/mode'

const modeAtom = atomWithStorage<Mode>('mode', 4)

export default modeAtom
