import { FC } from "react";
import { Typography } from "antd";

interface ScoreCheckerProps {
  sum: number;
  expected: number;
}

const ScoreChecker: FC<ScoreCheckerProps> = ({ sum, expected }) => {
  return (
    <Typography.Text type={sum === expected ? "success" : "danger"}>
      ●
    </Typography.Text>
  );
}

export default ScoreChecker;
