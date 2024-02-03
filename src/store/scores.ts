import { atomWithStorage } from 'jotai/utils'
import type { Score } from '../types/scores'

const scoresAtom = atomWithStorage<Score[]>('scores', [])

export default scoresAtom
