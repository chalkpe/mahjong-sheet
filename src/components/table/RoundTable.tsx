import { FC } from 'react'
import { Button, Table } from 'antd'

import { useAtom, useAtomValue } from 'jotai'
import modeAtom from '../../store/mode'
import namesAtom from '../../store/names'
import dataAtom from '../../store/data'

import Ba from './Ba'
import FuHan from './FuHan'
import Hai from './Hai'
import Score from './Score'

import { translateAgariType } from '../../types/agari'
import { translateWind } from '../../types/wind'

import type { Round } from '../../types/round'

const RoundTable: FC = () => {
  const mode = useAtomValue(modeAtom)
  const names = useAtomValue(namesAtom)
  const [data, setData] = useAtom(dataAtom)

  return (
    <Table
      bordered
      pagination={false}
      dataSource={data}
      columns={[
        {
          title: '장/국/본장',
          width: 130,
          render: (round: Round, _, index) => (
            <Ba
              round={round}
              setRound={(round) => {
                const newData = [...data]
                newData[index] = typeof round === 'function' ? round(newData[index]) : round
                setData(newData)
              }}
            />
          ),
        },
        {
          title: names[0],
          dataIndex: 'east',
          width: 100,
          align: 'center',
          render: (value: number, _: Round, index: number) => <Score wind="east" value={value} index={index} />,
        },
        ...(mode === 3 || mode === 4
          ? [
              {
                title: names[1],
                dataIndex: 'south',
                width: 100,
                align: 'center' as const,
                render: (value: number, _: Round, index: number) => <Score wind="south" value={value} index={index} />,
              },
            ]
          : []),
        {
          title: names[mode === 2 ? 1 : 2],
          dataIndex: 'west',
          width: 100,
          align: 'center',
          render: (value: number, _: Round, index: number) => <Score wind="west" value={value} index={index} />,
        },
        ...(mode === 4
          ? [
              {
                title: names[3],
                dataIndex: 'north',
                width: 100,
                align: 'center' as const,
                render: (value: number, _: Round, index: number) => <Score wind="north" value={value} index={index} />,
              },
            ]
          : []),
        {
          title: '화료',
          width: 100,
          align: 'center',
          dataIndex: 'agari',
          render: (agari: Round['agari']) =>
            agari.length !== mode && agari.length > 0
              ? agari.flatMap((a, index) => [index > 0 ? <br /> : '', translateWind(a, mode, names)])
              : '-',
        },
        {
          title: '형태',
          width: 100,
          align: 'center',
          dataIndex: 'type',
          render: (type: Round['type'], round: Round) =>
            (type === 'ron' ? ['', '', '더블 ', '트리플 '][round.agari.length] : '') + translateAgariType(type),
        },
        {
          title: '방총',
          width: 100,
          align: 'center',
          render: (round: Round) => (round.houjuu ? translateWind(round.houjuu, mode, names) : '-'),
        },
        {
          title: '부판',
          width: 140,
          align: 'center',
          render: (round: Round) => <FuHan round={round} />,
        },
        {
          title: '패',
          dataIndex: 'hai',
          render: (hai: string[]) => <Hai hai={hai} />,
        },
        {
          title: '삭제',
          align: 'center',
          render: (_, __, index) => (
            <Button
              type="link"
              onClick={() => {
                const newData = [...data]
                newData.splice(index, 1)
                setData(newData)
              }}
            >
              삭제
            </Button>
          ),
        },
      ]}
      rowKey={(round) => [round.ba, round.kyoku, round.honba, ...round.hai].join()}
    />
  )
}

export default RoundTable
