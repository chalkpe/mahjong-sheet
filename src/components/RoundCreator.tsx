import { FC, useCallback, useState } from "react";
import {
  Button,
  Card,
  Checkbox,
  Form,
  InputNumber,
  Radio,
  Select,
  Space,
} from "antd";
import Mahgen from "./Mahgen";
import MahjongInput from "./MahjongInput";
import { AgariType, Round, Wind, winds } from "../types/round";

interface RoundCreatorProps {
  mode: 2 | 3 | 4;
  names: [string, string, string, string];
  onCreated: (round: Round) => void;
}

const RoundCreator: FC<RoundCreatorProps> = ({ mode, names, onCreated }) => {
  const [ba, setBa] = useState<Wind>("east");
  const [kyoku, setKyoku] = useState(1);
  const [honba, setHonba] = useState(0);
  const [type, setType] = useState<AgariType>("tsumo");
  const [agari, setAgari] = useState<Wind[]>([]);
  const [houjuu, setHoujuu] = useState<Wind>();
  const [fu, setFu] = useState<number[]>([]);
  const [han, setHan] = useState<number[]>([]);
  const [hai, setHai] = useState<string[]>([]);

  const create = useCallback(() => {
    onCreated({
      ba,
      kyoku,
      honba,
      type,
      agari,
      houjuu,
      fu,
      han,
      hai,
      east: 0,
      south: 0,
      west: 0,
      north: 0,
    });

    setHai([""]);
  }, [ba, kyoku, honba, type, agari, houjuu, fu, han, hai, onCreated]);

  return (
    <Card title="생성하기" extra={<Button onClick={create}>생성</Button>}>
      <Space direction="vertical">
        <Form>
          <Form.Item label="장/국/본장">
            <Space>
              <Select
                value={ba}
                onChange={setBa}
                style={{ width: 70 }}
                options={[
                  { label: "동", value: "east" },
                  ...(mode === 3 || mode === 4
                    ? [{ label: "남", value: "south" }]
                    : []),
                  { label: "서", value: "west" },
                  ...(mode === 4 ? [{ label: "북", value: "north" }] : []),
                ]}
              />
              <Select
                value={kyoku}
                onChange={setKyoku}
                style={{ width: 70 }}
                options={[1, 2, 3, 4]
                  .slice(0, mode)
                  .map((i) => ({ label: `${i}국`, value: i }))}
              />

              <InputNumber
                value={honba}
                onChange={(v) => v !== null && setHonba(v)}
                min={0}
                defaultValue={0}
                suffix="본장"
              />
            </Space>
          </Form.Item>

          <Form.Item label="화료 유형">
            <Space>
              <Select
                value={type}
                onChange={(type) => {
                  setType(type);
                  setAgari([]);
                  setHoujuu(undefined);
                }}
                style={{ width: 70 }}
                options={[
                  { label: "쯔모", value: "tsumo" },
                  { label: "론", value: "ron" },
                  { label: "유국", value: "ryuukyoku" },
                ]}
              />

              {type === "tsumo" ? (
                <Radio.Group
                  value={agari[0]}
                  onChange={(e) => setAgari([e.target.value])}
                >
                  {names.slice(0, mode).map((name, index) => (
                    <Radio value={winds[mode][index]}>{name}</Radio>
                  ))}
                </Radio.Group>
              ) : (
                <>
                  {type === "ron" && (
                    <Select
                      value={houjuu}
                      onChange={setHoujuu}
                      placeholder="방총"
                      style={{ width: 120 }}
                      options={names.slice(0, mode).map((name, index) => ({
                        label: name + " 방총",
                        value: winds[mode][index],
                      }))}
                    />
                  )}
                  <Checkbox.Group
                    value={agari}
                    onChange={(v) => setAgari(v.length ? (v as Wind[]) : [])}
                  >
                    {winds[mode]
                      .filter((wind) => wind !== houjuu)
                      .map((wind) => (
                        <Checkbox value={wind}>
                          {names[winds[mode].indexOf(wind)]}
                        </Checkbox>
                      ))}
                  </Checkbox.Group>
                </>
              )}
            </Space>
          </Form.Item>

          <Space direction="vertical">
            {type !== "ryuukyoku" &&
              agari.map((_, index) => (
                <Card>
                  <Form.Item label="부판">
                    <Space>
                      {han[index] <= 4 && (
                        <InputNumber
                          value={fu[index]}
                          onChange={(v) => {
                            if (v === null) return;
                            const newFu = [...fu];
                            newFu[index] = v;
                            setFu(newFu);
                          }}
                          min={20}
                          step={5}
                          suffix="부"
                        />
                      )}
                      <InputNumber
                        value={han[index]}
                        onChange={(v) => {
                          if (v === null) return;
                          const newHan = [...han];
                          newHan[index] = v;
                          setHan(newHan);
                        }}
                        min={1}
                        suffix="판"
                      />
                    </Space>
                  </Form.Item>
                  <Form.Item label="화료패">
                    <Space direction="vertical">
                      <MahjongInput
                        value={hai[index]}
                        onChange={(h) => {
                          const newHai = [...hai];
                          newHai[index] = h;
                          setHai(newHai);
                        }}
                      />
                      <Mahgen
                        sequence={
                          hai[index] !== "||"
                            ? hai[index] ?? "||"
                            : "0000000000000z|0z"
                        }
                      />
                    </Space>
                  </Form.Item>
                </Card>
              ))}
          </Space>
        </Form>
      </Space>
    </Card>
  );
};

export default RoundCreator;
