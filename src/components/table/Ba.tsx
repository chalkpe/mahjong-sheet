import { Dispatch, FC, SetStateAction, useState } from 'react'
import { InputNumber, Select, Space, Typography } from 'antd'
import { CheckOutlined } from '@ant-design/icons'

import { useAtomValue } from 'jotai'
import modeAtom from '../../store/mode'

import ScoreChecker from './ScoreChecker'

import { translateWind, windOptions } from '../../types/wind'
import type { Round } from '../../types/round'

interface BaProps {
  round: Round
  setRound: Dispatch<SetStateAction<Round>>
}

const Ba: FC<BaProps> = ({ round, setRound }) => {
  const mode = useAtomValue(modeAtom)
  const [isEditing, setIsEditing] = useState(false)

  const [ba, setBa] = useState(round.ba)
  const [kyoku, setKyoku] = useState(round.kyoku)
  const [honba, setHonba] = useState(round.honba)

  if (isEditing) {
    return (
      <Space>
        <Select
          value={ba}
          onChange={(b) => {
            setBa(b)
            setKyoku(1)
            setHonba(0)
          }}
          style={{ width: 60 }}
          options={windOptions}
        />
        <Select
          value={kyoku}
          onChange={(k) => {
            setKyoku(k)
            setHonba(0)
          }}
          style={{ width: 70 }}
          options={[1, 2, 3, 4].slice(0, mode).map((i) => ({ label: `${i}국`, value: i }))}
        />

        <InputNumber
          type="number"
          value={honba}
          onChange={(v) => v !== null && setHonba(v)}
          min={0}
          defaultValue={0}
          suffix="본장"
          style={{ width: 70 }}
        />

        <CheckOutlined
          onClick={() => {
            setIsEditing(false)
            setRound((round) => ({ ...round, ba, kyoku, honba }))
          }}
        />
      </Space>
    )
  }

  return (
    <>
      {translateWind(round.ba, 4)}
      {round.kyoku}국 {round.honba}
      본장{' '}
      {mode === 2 && (
        <Typography.Text type="success" onClick={() => setIsEditing(true)}>
          ●
        </Typography.Text>
      )}
      {mode === 3 && <ScoreChecker sum={round.east + round.south + round.west} expected={105000} onClick={() => setIsEditing(true)} />}
      {mode === 4 && (
        <ScoreChecker sum={round.east + round.south + round.west + round.north} expected={100000} onClick={() => setIsEditing(true)} />
      )}
    </>
  )
}

export default Ba
