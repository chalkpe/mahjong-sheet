import { Dispatch, FC, SetStateAction } from 'react'
import { Card, Checkbox, Form, Space } from 'antd'

import { useAtomValue } from 'jotai'
import modeAtom from '../../store/atoms/mode'
import namesAtom from '../../store/atoms/names'

import FuHanInput from './FuHanInput'
import MahgenTooltip from './MahgenTooltip'
import MahjongInput from './MahjongInput'

import { AgariType, RyuukyokuType, translateAgariType } from '../../types/agari'
import { Wind, windsForMode } from '../../types/wind'

interface AgariCardProps {
  type: AgariType
  ryuukyokuType: RyuukyokuType | undefined
  agari: Wind[]
  fu: number[]
  setFu: Dispatch<SetStateAction<number[]>>
  han: number[]
  setHan: Dispatch<SetStateAction<number[]>>
  kazoe: boolean[]
  setKazoe: Dispatch<SetStateAction<boolean[]>>
  hai: string[]
  setHai: Dispatch<SetStateAction<string[]>>
}

const AgariCard: FC<AgariCardProps> = ({
  type,
  ryuukyokuType,
  agari,
  fu,
  setFu,
  han,
  setHan,
  kazoe,
  setKazoe,
  hai,
  setHai
}) => {
  const mode = useAtomValue(modeAtom)
  const names = useAtomValue(namesAtom)

  if (type === 'ryuukyoku' && ryuukyokuType === 'ryuukyoku') {
    return (
      <Space direction="vertical">
        {agari.map((wind, index) => (
          <Card key={wind} title={names[windsForMode[mode].indexOf(wind)]}>
            <Form.Item label="유국만관">
              <Checkbox
                value={han[index] === -1}
                onChange={(e) => {
                  const newHan = [...han]
                  newHan[index] = e.target.checked ? -1 : 0
                  setHan(newHan)
                }}
              />
            </Form.Item>
          </Card>
        ))}
      </Space>
    )
  }

  return (
    <Space direction="vertical">
      {agari.map((wind, index) => (
        <Card
          key={wind}
          title={`${
            names[windsForMode[mode].indexOf(wind)]
          } ${translateAgariType(type)}`}
        >
          {type !== 'ryuukyoku' && (
            <FuHanInput
              index={index}
              fu={fu}
              setFu={setFu}
              han={han}
              setHan={setHan}
              kazoe={kazoe}
              setKazoe={setKazoe}
            />
          )}
          <Form.Item
            label={
              <MahgenTooltip>
                {type === 'ryuukyoku' ? '패' : '화료패'}
              </MahgenTooltip>
            }
          >
            <MahjongInput
              value={hai[index]}
              onChange={(h) => {
                const newHai = [...hai]
                newHai[index] = h
                setHai(newHai)
              }}
            />
          </Form.Item>
        </Card>
      ))}
    </Space>
  )
}

export default AgariCard
