import { FC } from 'react'
import { Space } from 'antd'
import Mahgen from '../Mahgen'

interface HaiProps {
  hai: string[]
}

const Hai: FC<HaiProps> = ({ hai }) => {
  return (
    <Space direction="vertical">
      {hai.map((h, i) => (
        <Space key={h + i} direction="horizontal">
          {h
            .split('|')
            .filter(Boolean)
            .map((hh, i) => (
              <Mahgen key={hh + i} sequence={hh} size="small" />
            ))}
        </Space>
      ))}
    </Space>
  )
}

export default Hai
