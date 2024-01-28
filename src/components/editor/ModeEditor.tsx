import { FC } from 'react'
import { Segmented } from 'antd'

import { useAtom } from 'jotai'
import modeAtom from '../../store/mode'
import { Mode } from '../../types/mode'

const ModeEditor: FC = () => {
  const [mode, setMode] = useAtom(modeAtom)

  return (
    <Segmented
      options={['2인', '3인', '4인']}
      value={mode + '인'}
      onChange={(v) => setMode(parseInt(v.toString()[0]) as Mode)}
    />
  )
}

export default ModeEditor
