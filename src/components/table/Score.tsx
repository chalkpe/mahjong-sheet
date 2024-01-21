import { FC } from "react";
import { Typography } from "antd";

import { Round } from "../../types/round";
import { Wind } from "../../types/wind";

interface ScoreProps {
  wind: Wind;
  value: number;
  index: number;
  data: Round[];
  setData: (data: Round[]) => void;
}

const Score: FC<ScoreProps> = ({ wind, value, index, data, setData }) => {
  return (
    <Typography.Text
      editable={{
        text: value.toString(),
        onChange: (v) => {
          const newData = [...data];
          newData[index][wind] = parseInt(eval(v)) || 0;
          setData(newData);
        },
      }}
    >
      {value}
    </Typography.Text>
  );
}

export default Score;
