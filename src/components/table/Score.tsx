import { FC } from 'react'
import { Typography } from 'antd'

import { useAtomCallback } from 'jotai/utils'
import dataAtom from '../../store/data'

import { Wind } from '../../types/wind'

interface ScoreProps {
  wind: Wind
  value: number
  index: number
}

const Score: FC<ScoreProps> = ({ wind, value, index }) => {
  const onChange = useAtomCallback((get, set, value: string) => {
    const data = [...get(dataAtom)]
    data[index][wind] = parseInt(eval(value)) || 0
    set(dataAtom, data)
  })

  return <Typography.Text editable={{ text: value.toString(), onChange }}>{value.toLocaleString()}</Typography.Text>
}

export default Score
