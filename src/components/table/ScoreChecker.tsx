import { FC } from 'react'
import { Tooltip, Typography } from 'antd'

interface ScoreCheckerProps {
  sum: number
  expected: number
  onClick: () => void
}

const ScoreChecker: FC<ScoreCheckerProps> = ({ sum, expected, onClick }) => {
  return (
    <Tooltip title={sum > expected ? `${(sum - expected).toLocaleString()}점 초과` : 'Edit'}>
      <Typography.Text onClick={onClick} type={sum === expected ? 'success' : sum < expected ? 'warning' : 'danger'}>
        ●<span style={{ fontSize: '0.75rem' }}>{sum < expected && `${Math.floor((expected - sum) / 1000)}`}</span>
      </Typography.Text>
    </Tooltip>
  )
}

export default ScoreChecker
