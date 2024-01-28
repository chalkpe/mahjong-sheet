import { atom } from 'jotai'
import dataAtom, { lastRoundAtom } from './data'

import type { Wind } from '../../types/wind'
import type { AgariType, RyuukyokuType } from '../../types/agari'

export const baAtom = atom<Wind>('east')
export const kyokuAtom = atom<number>(1)
export const honbaAtom = atom<number>(0)
export const typeAtom = atom<AgariType>('tsumo')
export const ryuukyokuTypeAtom = atom<RyuukyokuType | undefined>(undefined)
export const agariAtom = atom<Wind[]>([])
export const houjuuAtom = atom<Wind | undefined>(undefined)
export const fuAtom = atom<number[]>([])
export const hanAtom = atom<number[]>([])
export const kazoeAtom = atom<boolean[]>([])
export const haiAtom = atom<string[]>([])

export const disabledAtom = atom((get) => {
  const type = get(typeAtom)
  const agari = get(agariAtom)
  const houjuu = get(houjuuAtom)
  const fu = get(fuAtom)
  const han = get(hanAtom)
  const hai = get(haiAtom)

  return (
    (type === 'ryuukyoku'
      ? false
      : type === 'tsumo'
      ? agari.length === 0
      : houjuu === undefined || agari.length === 0) ||
    (type !== 'ryuukyoku' &&
      [...Array(agari.length).keys()].some(
        (i) => !han[i] || (han[i] <= 4 && !fu[i]) || !hai[i] || hai[i] === '||'
      ))
  )
})

export const createAtom = atom(null, (get, set) => {
  const ba = get(baAtom)
  const kyoku = get(kyokuAtom)
  const honba = get(honbaAtom)
  const type = get(typeAtom)
  const ryuukyokuType = get(ryuukyokuTypeAtom)
  const agari = get(agariAtom)
  const houjuu = get(houjuuAtom)
  const fu = get(fuAtom)
  const han = get(hanAtom)
  const kazoe = get(kazoeAtom)
  const hai = get(haiAtom)
  const lastRound = get(lastRoundAtom)

  set(dataAtom, [
    ...get(dataAtom),
    {
      ba,
      kyoku,
      honba,
      type,
      ryuukyokuType,
      agari,
      houjuu,
      fu,
      han,
      kazoe,
      hai,
      east: lastRound?.east ?? 0,
      south: lastRound?.south ?? 0,
      west: lastRound?.west ?? 0,
      north: lastRound?.north ?? 0
    }
  ])

  set(typeAtom, 'tsumo')
  set(ryuukyokuTypeAtom, undefined)
  set(agariAtom, [])
  set(houjuuAtom, undefined)
  set(fuAtom, [])
  set(hanAtom, [])
  set(kazoeAtom, [])
  set(haiAtom, [])
})
