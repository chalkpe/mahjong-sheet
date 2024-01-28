import { FC } from 'react'
import { Checkbox, Form, InputNumber, Space } from 'antd'

import { useAtom } from 'jotai'
import { fuAtom, hanAtom, kazoeAtom } from '../../store/creator'

interface FuHanInputProps {
  index: number
}

const FuHanInput: FC<FuHanInputProps> = ({ index }) => {
  const [fu, setFu] = useAtom(fuAtom)
  const [han, setHan] = useAtom(hanAtom)
  const [kazoe, setKazoe] = useAtom(kazoeAtom)

  return (
    <Form.Item label="부판">
      <Space>
        {(!han[index] || han[index] <= 4) && (
          <InputNumber
            value={fu[index]}
            onChange={(v) => {
              if (v === null) return
              const newFu = [...fu]
              newFu[index] = v
              setFu(newFu)
            }}
            min={20}
            step={5}
            suffix="부"
          />
        )}
        <InputNumber
          value={han[index]}
          onChange={(v) => {
            if (v === null) return
            const newHan = [...han]
            newHan[index] = v
            setHan(newHan)
          }}
          min={1}
          suffix="판"
        />
        {han[index] >= 13 && (
          <>
            <Checkbox
              checked={kazoe[index]}
              onChange={(e) => {
                const newKazoe = [...kazoe]
                newKazoe[index] = e.target.checked
                setKazoe(newKazoe)
              }}
            >
              헤아림 역만?
            </Checkbox>
          </>
        )}
      </Space>
    </Form.Item>
  )
}

export default FuHanInput
