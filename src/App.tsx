import './App.css'

import { FC } from 'react'
import { Card, Space } from 'antd'

import { useAtomValue } from 'jotai'
import modeAtom from './store/mode'

import GameEditor from './components/editor/GameEditor'
import UmaTable from './components/table/UmaTable'
import RoundTable from './components/table/RoundTable'
import RoundCreator from './components/creator/RoundCreator'
import UmaRecorder from './components/table/UmaRecorder'

const App: FC = () => {
  const mode = useAtomValue(modeAtom)

  return (
    <Space direction="vertical">
      <GameEditor />
      <Card extra={mode !== 2 && <UmaRecorder />}>
        <Space direction="vertical" size="large">
          <RoundTable />
          {mode !== 2 && <UmaTable mode={mode} />}
        </Space>
      </Card>
      <RoundCreator />
    </Space>
  )
}

export default App
