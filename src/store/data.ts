import { atom } from 'jotai'
import { atomWithStorage } from 'jotai/utils'
import type { Round } from '../types/round'

const dataAtom = atomWithStorage<Round[]>('data', [])

export const lastRoundAtom = atom((get) => {
  const data = get(dataAtom)
  return data.length > 0 ? data[data.length - 1] : undefined
})

export default dataAtom
