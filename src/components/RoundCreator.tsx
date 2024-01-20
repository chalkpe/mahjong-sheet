import { FC, useCallback, useEffect, useMemo, useState } from "react";
import {
  Button,
  Card,
  Checkbox,
  Form,
  InputNumber,
  Radio,
  Select,
  Space,
  Tooltip,
  Typography,
} from "antd";
import { QuestionCircleOutlined } from "@ant-design/icons";
import Mahgen from "./Mahgen";
import MahjongInput from "./MahjongInput";
import { AgariType, Round, Wind, translateType, winds } from "../types/round";

interface RoundCreatorProps {
  mode: 2 | 3 | 4;
  names: [string, string, string, string];
  lastRound?: Round;
  onCreated: (round: Round) => void;
}

const RoundCreator: FC<RoundCreatorProps> = ({
  mode,
  names,
  lastRound,
  onCreated,
}) => {
  const [ba, setBa] = useState<Wind>("east");
  const [kyoku, setKyoku] = useState(1);
  const [honba, setHonba] = useState(0);
  const [type, setType] = useState<AgariType>("tsumo");
  const [agari, setAgari] = useState<Wind[]>([]);
  const [houjuu, setHoujuu] = useState<Wind>();
  const [fu, setFu] = useState<number[]>([]);
  const [han, setHan] = useState<number[]>([]);
  const [kazoe, setKazoe] = useState<boolean[]>([]);
  const [hai, setHai] = useState<string[]>([]);

  const disabled = useMemo(
    () =>
      (type === "ryuukyoku"
        ? false
        : type === "tsumo"
        ? agari.length === 0
        : houjuu === undefined || agari.length === 0) ||
      (type !== "ryuukyoku" &&
        [...Array(agari.length).keys()].some(
          (i) =>
            !han[i] || (han[i] <= 4 && !fu[i]) || !hai[i] || hai[i] === "||"
        )),
    [agari.length, fu, hai, han, houjuu, type]
  );

  const reset = useCallback(() => {
    setType("tsumo");
    setAgari([]);
    setHoujuu(undefined);
    setFu([]);
    setHan([]);
    setHai([]);
  }, []);

  useEffect(() => {
    setBa("east");
    setKyoku(1);
    setHonba(0);
    reset();
  }, [mode, reset]);

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
      kazoe,
      hai,
      east: lastRound?.east ?? 0,
      south: lastRound?.south ?? 0,
      west: lastRound?.west ?? 0,
      north: lastRound?.north ?? 0,
    });

    reset();
  }, [
    onCreated,
    ba,
    kyoku,
    honba,
    type,
    agari,
    houjuu,
    fu,
    han,
    kazoe,
    hai,
    lastRound?.east,
    lastRound?.south,
    lastRound?.west,
    lastRound?.north,
    reset,
  ]);

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
        <Form>
          <Form.Item label="장/국/본장">
            <Space>
              <Select
                value={ba}
                onChange={(b) => {
                  setBa(b);
                  setKyoku(1);
                  setHonba(0);
                }}
                style={{ width: 70 }}
                options={[
                  { label: "동", value: "east" },
                  { label: "남", value: "south" },
                  { label: "서", value: "west" },
                  { label: "북", value: "north" },
                ]}
              />
              <Select
                value={kyoku}
                onChange={(k) => {
                  setKyoku(k);
                  setHonba(0);
                }}
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
                    <Radio key={winds[mode][index]} value={winds[mode][index]}>
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
                        value: winds[mode][index],
                      }))}
                    />
                  )}
                  <Checkbox.Group
                    value={agari}
                    disabled={type === "ron" && houjuu === undefined}
                    onChange={(v) => {
                      const a = v as Wind[];
                      setAgari(
                        winds[mode].filter((wind) =>
                          a.includes(wind as Wind)
                        ) as Wind[]
                      );
                      setFu([]);
                      setHan([]);
                      setHai(Array(a.length).fill(""));
                    }}
                  >
                    {winds[mode]
                      .filter((wind) => wind !== houjuu)
                      .map((wind) => (
                        <Checkbox key={wind} value={wind}>
                          {names[winds[mode].indexOf(wind)]}
                        </Checkbox>
                      ))}
                  </Checkbox.Group>
                </>
              )}
            </Space>
          </Form.Item>

          <Space direction="vertical">
            {type === "ryuukyoku"
              ? agari.map((wind, index) => (
                  <Card key={wind} title={names[winds[mode].indexOf(wind)]}>
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
                ))
              : agari.map((wind, index) => (
                  <Card
                    key={wind}
                    title={`${names[winds[mode].indexOf(wind)]} ${translateType(
                      type
                    )}`}
                  >
                    <Form.Item label="부판">
                      <Space>
                        {(!han[index] || han[index] <= 4) && (
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
                        {han[index] >= 13 && (
                          <>
                            <Checkbox
                              value={kazoe[index]}
                              onChange={(e) => {
                                const newKazoe = [...kazoe];
                                newKazoe[index] = e.target.checked;
                                setKazoe(newKazoe);
                              }}
                            >
                              헤아림 역만?
                            </Checkbox>
                          </>
                        )}
                      </Space>
                    </Form.Item>
                    <Form.Item
                      label={
                        <>
                          화료패
                          <Tooltip
                            placement="right"
                            color="#fff"
                            title={
                              <Typography>
                                <Typography.Paragraph>
                                  <Typography.Title level={5}>
                                    설명
                                  </Typography.Title>
                                  1만~9만은{" "}
                                  <Typography.Text code>1m~9m</Typography.Text>,
                                  1통~9통은{" "}
                                  <Typography.Text code>1p~9p</Typography.Text>,
                                  1삭~9삭은{" "}
                                  <Typography.Text code>1s~9s</Typography.Text>,
                                  동남서북백발중은{" "}
                                  <Typography.Text code>1z~7z</Typography.Text>,
                                  적색 5만, 적색 5통 적색 5삭은 각각{" "}
                                  <Typography.Text code>
                                    0m, 0p, 0s
                                  </Typography.Text>
                                  로, 뒤집힌 패는{" "}
                                  <Typography.Text code>0z</Typography.Text>로
                                  입력하면 됩니다.
                                </Typography.Paragraph>
                                <Typography.Paragraph>
                                  <Typography.Title level={5}>
                                    예시
                                  </Typography.Title>
                                  녹일색:{" "}
                                  <Typography.Text code>
                                    22233344488s666z
                                  </Typography.Text>
                                  <br />
                                  국사무쌍:{" "}
                                  <Typography.Text code>
                                    19m19p19s12345677z
                                  </Typography.Text>
                                </Typography.Paragraph>
                              </Typography>
                            }
                          >
                            <QuestionCircleOutlined />
                          </Tooltip>
                        </>
                      }
                    >
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
                            hai[index] && hai[index] !== "||"
                              ? hai[index]
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
