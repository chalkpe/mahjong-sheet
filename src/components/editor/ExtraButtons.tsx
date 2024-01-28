import { FC } from 'react'
import { Button, Space, message } from 'antd'
import {
  ExportOutlined,
  GithubOutlined,
  ImportOutlined
} from '@ant-design/icons'

import { useAtom } from 'jotai'
import modeAtom from '../../store/mode'
import namesAtom from '../../store/names'
import dataAtom from '../../store/data'

const ExtraButtons: FC = () => {
  const [mode, setMode] = useAtom(modeAtom)
  const [names, setNames] = useAtom(namesAtom)
  const [data, setData] = useAtom(dataAtom)

  return (
    <Space>
      <Button
        icon={<ImportOutlined />}
        onClick={() => {
          navigator.clipboard.readText().then((text) => {
            try {
              const { mode, names, data } = JSON.parse(text)
              setMode(mode)
              setNames(names)
              setData(data)
              message.success('클립보드에서 데이터를 가져왔습니다.')
            } catch {
              message.error('클립보드에 올바른 데이터가 없습니다.')
            }
          })
        }}
      >
        가져오기
      </Button>

      <Button
        icon={<ExportOutlined />}
        onClick={() => {
          navigator.clipboard.writeText(JSON.stringify({ mode, names, data }))
          message.success('클립보드에 데이터를 복사했습니다.')
        }}
      >
        내보내기
      </Button>

      <Button
        icon={<GithubOutlined />}
        onClick={() =>
          open('https://github.com/chalkpe/mahjong-sheet', '_blank')
        }
      />
    </Space>
  )
}

export default ExtraButtons
