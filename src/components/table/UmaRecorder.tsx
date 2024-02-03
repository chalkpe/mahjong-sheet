import { FC, useCallback } from 'react'
import { Button } from 'antd'

import { useAtomValue, useSetAtom } from 'jotai'
import scoresAtom from '../../store/scores'
import { lastRoundAtom } from '../../store/data'

const UmaRecorder: FC = () => {
  const lastRound = useAtomValue(lastRoundAtom)
  const setScores = useSetAtom(scoresAtom)

  const onRecord = useCallback(() => {
    if (!lastRound) return

    setScores((scores) => [
      ...scores,
      {
        east: lastRound.east,
        south: lastRound.south,
        west: lastRound.west,
        north: lastRound.north,
      },
    ])
  }, [lastRound, setScores])

  return (
    <>
      <Button type="default" onClick={onRecord} disabled={!lastRound}>
        총점 기록하기
      </Button>
    </>
  )
}

export default UmaRecorder
