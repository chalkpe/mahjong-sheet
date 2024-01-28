import './App.css'

import { FC } from 'react'
import { Card, Space } from 'antd'

import { useAtomValue } from 'jotai'
import modeAtom from './store/mode'
import { lastRoundAtom } from './store/data'

import GameEditor from './components/editor/GameEditor'
import UmaTable from './components/table/UmaTable'
import RoundTable from './components/table/RoundTable'
import RoundCreator from './components/creator/RoundCreator'

const App: FC = () => {
  const mode = useAtomValue(modeAtom)
  const lastRound = useAtomValue(lastRoundAtom)

  return (
    <Space direction="vertical">
      <GameEditor />
      <Card>
        <Space direction="vertical" size="large">
          <RoundTable />
          {mode !== 2 && lastRound && <UmaTable mode={mode} round={lastRound} />}
        </Space>
      </Card>
      <RoundCreator />
    </Space>
  )
}

export default App
