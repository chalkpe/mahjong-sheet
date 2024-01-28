import { Dispatch, FC, SetStateAction } from 'react'
import { InputNumber, Select, Space } from 'antd'

import { useAtomValue } from 'jotai'
import modeAtom from '../../store/atoms/mode'

import { Wind, windOptions } from '../../types/wind'

interface BaSelect {
  ba: Wind
  setBa: Dispatch<SetStateAction<Wind>>
  kyoku: number
  setKyoku: Dispatch<SetStateAction<number>>
  honba: number
  setHonba: Dispatch<SetStateAction<number>>
}

const BaSelect: FC<BaSelect> = ({
  ba,
  setBa,
  kyoku,
  setKyoku,
  honba,
  setHonba
}) => {
  const mode = useAtomValue(modeAtom)

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
        options={[1, 2, 3, 4]
          .slice(0, mode)
          .map((i) => ({ label: `${i}국`, value: i }))}
      />

      <InputNumber
        value={honba}
        onChange={(v) => v !== null && setHonba(v)}
        min={0}
        defaultValue={0}
        suffix="본장"
        style={{ width: 70 }}
      />
    </Space>
  )
}

export default BaSelect
