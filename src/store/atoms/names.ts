import { atomWithStorage } from 'jotai/utils'
import { Names, defaultNames } from '../../types/names'

const namesAtom = atomWithStorage<Names>('names', defaultNames)

export default namesAtom
