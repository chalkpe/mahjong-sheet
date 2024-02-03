import { atom } from 'jotai'
import { atomWithStorage } from 'jotai/utils'
import type { Round } from '../types/round'
import type { Score } from '../types/scores'

const dataAtom = atomWithStorage<Round[]>('data', [])

export const lastRoundAtom = atom((get) => {
  const data = get(dataAtom)
  return data.length > 0 ? data[data.length - 1] : null
})

export const lastScoreAtom = atom<Score>((get) => {
  const data = get(dataAtom)
  return {
    east: data[data.length - 1]?.east ?? 0,
    south: data[data.length - 1]?.south ?? 0,
    west: data[data.length - 1]?.west ?? 0,
    north: data[data.length - 1]?.north ?? 0,
  }
})

export default dataAtom
