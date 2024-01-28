import { FC } from 'react'
import { InputNumber, Select, Space } from 'antd'

import { useAtom, useAtomValue } from 'jotai'
import modeAtom from '../../store/mode'

import { windOptions } from '../../types/wind'
import { baAtom, honbaAtom, kyokuAtom } from '../../store/creator'

const BaSelect: FC = () => {
  const mode = useAtomValue(modeAtom)

  const [ba, setBa] = useAtom(baAtom)
  const [kyoku, setKyoku] = useAtom(kyokuAtom)
  const [honba, setHonba] = useAtom(honbaAtom)

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
