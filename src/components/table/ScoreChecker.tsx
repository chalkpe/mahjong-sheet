import { FC } from "react";
import { Typography } from "antd";

interface ScoreCheckerProps {
  sum: number;
  expected: number;
}

const ScoreChecker: FC<ScoreCheckerProps> = ({ sum, expected }) => {
  return (
    <Typography.Text
      type={
        sum === expected ? "success" : sum < expected ? "warning" : "danger"
      }
    >
      ●
      <span style={{ fontSize: "0.75rem" }}>
        {sum < expected && `${Math.floor((expected - sum) / 1000)}`}
      </span>
    </Typography.Text>
  );
};

export default ScoreChecker;
