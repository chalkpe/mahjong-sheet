import { FC } from 'react'
import { Card, Form } from 'antd'

import ModeEditor from './ModeEditor'
import NameEditor from './NameEditor'
import ExtraButtons from './ExtraButtons'

const GameEditor: FC = () => {
  return (
    <Card title="기본 설정" extra={<ExtraButtons />}>
      <Form>
        <Form.Item label="모드">
          <ModeEditor />
        </Form.Item>
        <Form.Item label="닉네임">
          <NameEditor />
        </Form.Item>
      </Form>
    </Card>
  )
}

export default GameEditor
