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
          .sort((a, b) => b.score - a.score || windsForMode[mode].indexOf(a.wind) - windsForMode[mode].indexOf(b.wind))
          .map((s, i) => ({
            wind: s.wind,
            score: s.score,
            uma: (s.score - (mode === 3 ? 35000 : 25000)) / 1000 + uma[mode][i],
          }))
          .sort((a, b) => windsForMode[mode].indexOf(a.wind) - windsForMode[mode].indexOf(b.wind))
      : null

  return scores
}

const calculateRanks = (sum: Score, mode: UmaMode) =>
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
    .sort((a, b) => windsForMode[mode].indexOf(a.wind) - windsForMode[mode].indexOf(b.wind))

const render = (score: number | { score: number; uma: number }, ranks: { rank: number }[], index: number) => {
  if (!score) score = 0

  return typeof score === 'number' ? (
    <>
      {(score > 0 ? '+' : '') + score.toFixed(1)}
      <br />
      <Typography.Text strong>{ranks[index]?.rank ?? '-'}등</Typography.Text>
    </>
  ) : (
    <>
      {score.score}
      <br />
      {(score.uma > 0 ? '+' : '') + score.uma.toFixed(1)}
      <br />
      <Typography.Text strong>{ranks[index]?.rank ?? '-'}등</Typography.Text>
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
  const umas = useMemo(() => scores.map((score) => calculateUma(score, mode)), [mode, scores])
  const ranks = useMemo(() => scores.map((score) => calculateRanks(score, mode)), [mode, scores])

  const lastScore = useAtomValue(lastScoreAtom)
  const lastUma = useMemo(() => calculateUma(lastScore, mode), [lastScore, mode])
  const lastRanks = useMemo(() => calculateRanks(lastScore, mode), [lastScore, mode])

  const sum: Score = useMemo(
    () =>
      [...umas, lastUma].filter(filterNull).reduce(
        (sum, uma) => ({
          east: sum.east + uma[0].uma,
          south: sum.south + uma[1].uma,
          west: sum.west + uma[2].uma,
          north: sum.north + (uma[3]?.uma ?? 0),
        }),
        { east: 0, south: 0, west: 0, north: 0 }
      ),
    [lastUma, umas]
  )
  const sumRanks = useMemo(() => calculateRanks(sum, mode), [sum, mode])

  return (
    <article style={{ width: '630px' }}>
      <Table
        sticky
        bordered
        pagination={false}
        columns={[
          {
            title: '',
            dataIndex: 'title',
            width: 130,
            render: (title: string) => <Typography.Text strong>{title}</Typography.Text>,
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
            width: 100,
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
            east: uma ? render(uma[0], ranks[index], 0) : '-',
            south: uma ? render(uma[1], ranks[index], 1) : '-',
            west: uma ? render(uma[2], ranks[index], 2) : '-',
            north: uma ? render(uma[3], ranks[index], 3) : '-',
          })),
          {
            title: '현재',
            east: lastUma ? render(lastUma[0], lastRanks, 0) : '-',
            south: lastUma ? render(lastUma[1], lastRanks, 1) : '-',
            west: lastUma ? render(lastUma[2], lastRanks, 2) : '-',
            north: lastUma ? render(lastUma[3], lastRanks, 3) : '-',
          },
          {
            title: '총합',
            east: render(sum.east, sumRanks, 0),
            south: render(sum.south, sumRanks, 1),
            west: render(sum.west, sumRanks, 2),
            north: render(sum.north, sumRanks, 3),
          },
        ]}
      />
    </article>
  )
}

export default UmaTable
