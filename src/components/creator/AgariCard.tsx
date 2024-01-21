import { Dispatch, FC, SetStateAction } from "react";
import { Card, Checkbox, Form, Space } from "antd";

import FuHanInput from "./FuHanInput";
import MahgenTooltip from "./MahgenTooltip";
import MahjongInput from "./MahjongInput";

import {
  AgariType,
  RyuukyokuType,
  translateAgariType,
} from "../../types/agari";
import { Mode } from "../../types/mode";
import { Names } from "../../types/names";
import { Wind, windsForMode } from "../../types/wind";

interface AgariCardProps {
  mode: Mode;
  names: Names;
  type: AgariType;
  ryuukyokuType: RyuukyokuType | undefined;
  agari: Wind[];
  fu: number[];
  setFu: Dispatch<SetStateAction<number[]>>;
  han: number[];
  setHan: Dispatch<SetStateAction<number[]>>;
  kazoe: boolean[];
  setKazoe: Dispatch<SetStateAction<boolean[]>>;
  hai: string[];
  setHai: Dispatch<SetStateAction<string[]>>;
}

const AgariCard: FC<AgariCardProps> = ({
  mode,
  names,
  type,
  ryuukyokuType,
  agari,
  fu,
  setFu,
  han,
  setHan,
  kazoe,
  setKazoe,
  hai,
  setHai,
}) => {
  if (type === "ryuukyoku" && ryuukyokuType === "ryuukyoku") {
    return (
      <Space direction="vertical">
        {agari.map((wind, index) => (
          <Card key={wind} title={names[windsForMode[mode].indexOf(wind)]}>
            <Form.Item label="유국만관">
              <Checkbox
                value={han[index] === -1}
                onChange={(e) => {
                  const newHan = [...han];
                  newHan[index] = e.target.checked ? -1 : 0;
                  setHan(newHan);
                }}
              />
            </Form.Item>
          </Card>
        ))}
      </Space>
    );
  }

  return (
    <Space direction="vertical">
      {agari.map((wind, index) => (
        <Card
          key={wind}
          title={`${
            names[windsForMode[mode].indexOf(wind)]
          } ${translateAgariType(type)}`}
        >
          {type !== "ryuukyoku" && (
            <FuHanInput
              index={index}
              fu={fu}
              setFu={setFu}
              han={han}
              setHan={setHan}
              kazoe={kazoe}
              setKazoe={setKazoe}
            />
          )}
          <Form.Item
            label={
              <MahgenTooltip>
                {type === "ryuukyoku" ? "패" : "화료패"}
              </MahgenTooltip>
            }
          >
            <MahjongInput
              value={hai[index]}
              onChange={(h) => {
                const newHai = [...hai];
                newHai[index] = h;
                setHai(newHai);
              }}
            />
          </Form.Item>
        </Card>
      ))}
    </Space>
  );
};

export default AgariCard;
