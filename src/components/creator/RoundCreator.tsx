import { FC } from 'react'
import { Button, Card, Form, Space } from 'antd'

import { useAtomValue, useSetAtom } from 'jotai'
import { createAtom, disabledAtom } from '../../store/atoms/creator'

import AgariCard from './AgariCard'
import BaSelect from './BaSelect'
import TypeSelect from './TypeSelect'

const RoundCreator: FC = () => {
  const disabled = useAtomValue(disabledAtom)
  const create = useSetAtom(createAtom)

  return (
    <Card
      title="생성하기"
      extra={
        <Button disabled={disabled} onClick={create}>
          생성
        </Button>
      }
    >
      <Space direction="vertical">
        <Form.Item label="장/국/본장">
          <BaSelect />
        </Form.Item>

        <Form.Item label="화료 유형">
          <TypeSelect />
        </Form.Item>

        <AgariCard />
      </Space>
    </Card>
  )
}

export default RoundCreator
