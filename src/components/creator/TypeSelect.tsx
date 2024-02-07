import { FC } from 'react'
import { Checkbox, Radio, Select, Space } from 'antd'

import { useAtom, useAtomValue } from 'jotai'
import { useAtomCallback } from 'jotai/utils'
import modeAtom from '../../store/mode'
import namesAtom from '../../store/names'
import { agariAtom, fuAtom, haiAtom, hanAtom, houjuuAtom, kazoeAtom, ryuukyokuTypeAtom, typeAtom } from '../../store/creator'

import { agariTypeOptions, ryuukyokuTypeOptions } from '../../types/agari'
import { Wind, windsForMode } from '../../types/wind'

const TypeSelect: FC = () => {
  const mode = useAtomValue(modeAtom)
  const names = useAtomValue(namesAtom)

  const [type, setType] = useAtom(typeAtom)
  const [ryuukyokuType, setRyuukyokuType] = useAtom(ryuukyokuTypeAtom)
  const [agari, setAgari] = useAtom(agariAtom)
  const [houjuu, setHoujuu] = useAtom(houjuuAtom)

  const reset = useAtomCallback((get, set) => {
    const agari = get(agariAtom)
    set(fuAtom, [])
    set(hanAtom, [])
    set(kazoeAtom, [])
    set(haiAtom, Array(agari.length).fill(''))
  })

  return (
    <Space>
      <Select
        value={type}
        onChange={(type) => {
          setType(type)
          setAgari([])
          setHoujuu(undefined)
        }}
        style={{ width: 70 }}
        options={agariTypeOptions}
      />

      {type === 'tsumo' ? (
        <Radio.Group
          value={agari[0]}
          onChange={(e) => {
            setAgari([e.target.value])
            reset()
          }}
        >
          {names.slice(0, mode).map((name, index) => (
            <Radio key={windsForMode[mode][index]} value={windsForMode[mode][index]}>
              {name}
            </Radio>
          ))}
        </Radio.Group>
      ) : (
        <>
          {type === 'ron' && (
            <Select
              value={houjuu}
              onChange={(h) => {
                setHoujuu(h)
                setAgari([])
              }}
              placeholder="방총"
              style={{ width: 120 }}
              options={names.slice(0, mode).map((name, index) => ({ label: name + ' 방총', value: windsForMode[mode][index] }))}
            />
          )}
          {type === 'ryuukyoku' && (
            <Select
              value={ryuukyokuType}
              onChange={(r) => {
                setRyuukyokuType(r)
                setAgari([])
              }}
              placeholder="유형"
              style={{ width: 120 }}
              options={ryuukyokuTypeOptions}
            />
          )}

          {(type === 'ron' || (type === 'ryuukyoku' && (ryuukyokuType === 'ryuukyoku' || ryuukyokuType === 'kyuushuukyuuhai'))) && (
            <Checkbox.Group
              value={agari}
              disabled={type === 'ron' && houjuu === undefined}
              onChange={(v) => {
                const a = v as Wind[]
                setAgari(windsForMode[mode].filter((wind) => a.includes(wind as Wind)) as Wind[])
                reset()
              }}
            >
              {windsForMode[mode]
                .filter((wind) => wind !== houjuu)
                .map((wind) => (
                  <Checkbox key={wind} value={wind}>
                    {names[windsForMode[mode].indexOf(wind)]}
                  </Checkbox>
                ))}
            </Checkbox.Group>
          )}
        </>
      )}
    </Space>
  )
}

export default TypeSelect
