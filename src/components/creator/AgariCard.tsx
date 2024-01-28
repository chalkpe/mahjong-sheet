import { FC } from 'react'
import { Card, Checkbox, Form, Space } from 'antd'

import { useAtom, useAtomValue } from 'jotai'
import modeAtom from '../../store/atoms/mode'
import namesAtom from '../../store/atoms/names'
import {
  agariAtom,
  haiAtom,
  hanAtom,
  ryuukyokuTypeAtom,
  typeAtom
} from '../../store/atoms/creator'

import FuHanInput from './FuHanInput'
import MahgenTooltip from './MahgenTooltip'
import MahjongInput from './MahjongInput'

import { translateAgariType } from '../../types/agari'
import { windsForMode } from '../../types/wind'

const AgariCard: FC = () => {
  const mode = useAtomValue(modeAtom)
  const names = useAtomValue(namesAtom)

  const type = useAtomValue(typeAtom)
  const ryuukyokuType = useAtomValue(ryuukyokuTypeAtom)
  const agari = useAtomValue(agariAtom)

  const [han, setHan] = useAtom(hanAtom)
  const [hai, setHai] = useAtom(haiAtom)

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
          {type !== 'ryuukyoku' && <FuHanInput index={index} />}
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
