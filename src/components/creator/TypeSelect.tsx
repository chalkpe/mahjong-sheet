import { Dispatch, FC, SetStateAction } from "react";
import { Checkbox, Radio, Select, Space } from "antd";

import { AgariType, RyuukyokuType, agariTypeOptions, ryuukyokuTypeOptions } from "../../types/agari";
import { Mode } from "../../types/mode";
import { Wind, windsForMode } from "../../types/wind";

interface TypeSelectProps {
  mode: Mode;
  names: [string, string, string, string];
  type: AgariType;
  setType: Dispatch<SetStateAction<AgariType>>;
  ryuukyokuType: RyuukyokuType | undefined;
  setRyuukyokuType: Dispatch<SetStateAction<RyuukyokuType | undefined>>;
  agari: Wind[];
  setAgari: Dispatch<SetStateAction<Wind[]>>;
  houjuu: Wind | undefined;
  setHoujuu: Dispatch<SetStateAction<Wind | undefined>>;
  setFu: Dispatch<SetStateAction<number[]>>;
  setHan: Dispatch<SetStateAction<number[]>>;
  setHai: Dispatch<SetStateAction<string[]>>;
}

const TypeSelect: FC<TypeSelectProps> = ({
  mode,
  names,
  type,
  setType,
  ryuukyokuType,
  setRyuukyokuType,
  agari,
  setAgari,
  houjuu,
  setHoujuu,
  setFu,
  setHan,
  setHai,
}) => {
  return (
    <Space>
      <Select
        value={type}
        onChange={(type) => {
          setType(type);
          setAgari([]);
          setHoujuu(undefined);
        }}
        style={{ width: 70 }}
        options={agariTypeOptions}
      />

      {type === "tsumo" ? (
        <Radio.Group
          value={agari[0]}
          onChange={(e) => setAgari([e.target.value])}
        >
          {names.slice(0, mode).map((name, index) => (
            <Radio
              key={windsForMode[mode][index]}
              value={windsForMode[mode][index]}
            >
              {name}
            </Radio>
          ))}
        </Radio.Group>
      ) : (
        <>
          {type === "ron" && (
            <Select
              value={houjuu}
              onChange={(h) => {
                setHoujuu(h);
                setAgari([]);
              }}
              placeholder="방총"
              style={{ width: 120 }}
              options={names.slice(0, mode).map((name, index) => ({
                label: name + " 방총",
                value: windsForMode[mode][index],
              }))}
            />
          )}
          {type === "ryuukyoku" && (
            <Select
              value={ryuukyokuType}
              onChange={(r) => {
                setRyuukyokuType(r);
                setAgari([]);
              }}
              placeholder="유형"
              style={{ width: 120 }}
              options={ryuukyokuTypeOptions}
            />
          )}

          {(type === "ron" ||
            (type === "ryuukyoku" &&
              (ryuukyokuType === "ryuukyoku" ||
                ryuukyokuType === "kyuushuukyuuhai"))) && (
            <Checkbox.Group
              value={agari}
              disabled={type === "ron" && houjuu === undefined}
              onChange={(v) => {
                const a = v as Wind[];
                setAgari(
                  windsForMode[mode].filter((wind) =>
                    a.includes(wind as Wind)
                  ) as Wind[]
                );
                setFu([]);
                setHan([]);
                setHai(Array(a.length).fill(""));
              }}
            >
              {windsForMode[mode]
                .filter((wind) => wind !== houjuu)
                .map((wind) => (
                  <Checkbox key={wind} value={wind}>
                    {names[windsForMode[mode].indexOf(wind)]}
                  </Checkbox>
                ))}
            </Checkbox.Group>
          )}
        </>
      )}
    </Space>
  );
};

export default TypeSelect;
