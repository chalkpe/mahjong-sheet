import { FC, useMemo } from 'react'
import { Button, Table, Typography } from 'antd'

import { useAtom, useAtomValue } from 'jotai'
import namesAtom from '../../store/names'
import scoresAtom from '../../store/scores'
import { lastScoreAtom } from '../../store/data'

import { windsForMode } from '../../types/wind'
import type { Score } from '../../types/scores'
import type { UmaMode } from '../../types/mode'

const uma = {
  3: [15, 0, -15],
  4: [15, 5, -5, -15],
}

const sum = {
  3: 105000, // 35000 * 3
  4: 100000, // 25000 * 4
}

const calculateUma = (score: Score, mode: UmaMode) => {
  const base =
    mode === 3
      ? [
          { wind: 'east', score: score.east },
          { wind: 'south', score: score.south },
          { wind: 'west', score: score.west },
        ]
      : [
          { wind: 'east', score: score.east },
          { wind: 'south', score: score.south },
          { wind: 'west', score: score.west },
          { wind: 'north', score: score.north },
        ]

  const scores =
    base.reduce((sum, s) => sum + s.score, 0) === sum[mode]
      ? base
          .sort(
            (a, b) =>
              b.score - a.score ||
              windsForMode[mode].indexOf(a.wind) -
                windsForMode[mode].indexOf(b.wind)
          )
          .map((s, i) => ({
            wind: s.wind,
            score: s.score,
            uma: (s.score - (mode === 3 ? 35000 : 25000)) / 1000 + uma[mode][i],
          }))
          .sort(
            (a, b) =>
              windsForMode[mode].indexOf(a.wind) -
              windsForMode[mode].indexOf(b.wind)
          )
      : null

  return scores
}

const renderScore = (score: number | { score: number; uma: number }) => {
  if (!score) return '-'

  return typeof score === 'number' ? (
    (score > 0 ? '+' : '') + score.toFixed(1)
  ) : (
    <>
      {score.score}
      <br />({(score.uma > 0 ? '+' : '') + score.uma.toFixed(1)})
    </>
  )
}

const filterNull = <T,>(value: T | null): value is T => value !== null

interface UmaTableProps {
  mode: UmaMode
}

const UmaTable: FC<UmaTableProps> = ({ mode }) => {
  const names = useAtomValue(namesAtom)

  const [scores, setScores] = useAtom(scoresAtom)
  const umas = useMemo(
    () => scores.map((score) => calculateUma(score, mode)),
    [mode, scores]
  )

  const lastScore = useAtomValue(lastScoreAtom)
  const lastUma = useMemo(
    () => calculateUma(lastScore, mode),
    [lastScore, mode]
  )

  const sum = useMemo(
    () =>
      [...umas, lastUma].filter(filterNull).reduce(
        (sum, uma) => ({
          east: sum.east + uma[0].uma,
          south: sum.south + uma[1].uma,
          west: sum.west + uma[2].uma,
          north: sum.north + (uma[3]?.uma ?? 0),
        }),
        {
          east: 0,
          south: 0,
          west: 0,
          north: 0,
        }
      ),
    [lastUma, umas]
  )

  const ranks = useMemo(
    () =>
      (mode === 3
        ? [
            { wind: 'east', sum: sum.east },
            { wind: 'south', sum: sum.south },
            { wind: 'west', sum: sum.west },
          ]
        : [
            { wind: 'east', sum: sum.east },
            { wind: 'south', sum: sum.south },
            { wind: 'west', sum: sum.west },
            { wind: 'north', sum: sum.north },
          ]
      )
        .sort((a, b) => b.sum - a.sum)
        .map((s, i) => ({ ...s, rank: i + 1 }))
        .sort(
          (a, b) =>
            windsForMode[mode].indexOf(a.wind) -
            windsForMode[mode].indexOf(b.wind)
        ),
    [sum, mode]
  )

  return (
    <Table
      style={{ width: 'fit-content' }}
      bordered
      pagination={false}
      columns={[
        {
          title: '',
          dataIndex: 'title',
          width: 130,
          render: (title: string) => (
            <Typography.Text strong>{title}</Typography.Text>
          ),
        },
        {
          title: names[0],
          dataIndex: 'east',
          width: 100,
          align: 'center',
        },
        {
          title: names[1],
          dataIndex: 'south',
          width: 100,
          align: 'center',
        },

        {
          title: names[2],
          dataIndex: 'west',
          width: 100,
          align: 'center',
        },
        ...(mode === 4
          ? [
              {
                title: names[3],
                dataIndex: 'north',
                width: 100,
                align: 'center' as const,
              },
            ]
          : []),
        {
          title: '삭제',
          align: 'center',
          render: (_, __, index) => {
            if (index >= umas.length) return null
            return (
              <Button
                type="link"
                onClick={() => {
                  const newScores = [...scores]
                  newScores.splice(index, 1)
                  setScores(newScores)
                }}
              >
                삭제
              </Button>
            )
          },
        },
      ]}
      dataSource={[
        ...umas.map((uma, index) => ({
          title: `#${index + 1}`,
          east: uma ? renderScore(uma[0]) : '-',
          south: uma ? renderScore(uma[1]) : '-',
          west: uma ? renderScore(uma[2]) : '-',
          north: uma ? renderScore(uma[3]) : '-',
        })),
        {
          title: '현재',
          east: lastUma ? renderScore(lastUma[0]) : '-',
          south: lastUma ? renderScore(lastUma[1]) : '-',
          west: lastUma ? renderScore(lastUma[2]) : '-',
          north: lastUma ? renderScore(lastUma[3]) : '-',
        },
        {
          title: '총합',
          east: sum.east === 0 ? '-' : renderScore(sum.east),
          south: sum.south === 0 ? '-' : renderScore(sum.south),
          west: sum.west === 0 ? '-' : renderScore(sum.west),
          north: sum.north === 0 ? '-' : renderScore(sum.north),
        },
        {
          title: '순위',
          east: ranks[0].rank,
          south: ranks[1].rank,
          west: ranks[2].rank,
          north: ranks[3]?.rank,
        },
      ]}
    />
  )
}

export default UmaTable
