export type AgariType = 'tsumo' | 'ron' | 'ryuukyoku'

export type RyuukyokuType = 'ryuukyoku' | 'kyuushuukyuuhai' | 'suufonrenda' | 'suuchariichi' | 'suukaikan'

export const translateAgariType = (type: AgariType) => (type === 'tsumo' ? '쯔모' : type === 'ron' ? '론' : '유국')

export const agariTypeOptions = [
  { label: '쯔모', value: 'tsumo' },
  { label: '론', value: 'ron' },
  { label: '유국', value: 'ryuukyoku' },
]

export const ryuukyokuTypeOptions: { label: string; value: RyuukyokuType }[] = [
  { label: '황패유국', value: 'ryuukyoku' },
  { label: '구종구패', value: 'kyuushuukyuuhai' },
  { label: '사풍연타', value: 'suufonrenda' },
  { label: '사가리치', value: 'suuchariichi' },
  { label: '사개깡', value: 'suukaikan' },
]
