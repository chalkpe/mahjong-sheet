import { FC } from "react";
import { Button, Space, Table } from "antd";
import Mahgen from "./Mahgen";
import Score from "./Score";
import ScoreChecker from "./ScoreChecker";
import {
  Round,
  ryuukyokuTypes,
  translateType,
  translateWind,
} from "../types/round";

interface RoundTableProps {
  mode: 2 | 3 | 4;
  data: Round[];
  setData: (data: Round[]) => void;
  names: [string, string, string, string];
}

const RoundTable: FC<RoundTableProps> = ({ mode, data, setData, names }) => {
  return (
    <Table
      bordered
      pagination={false}
      dataSource={data}
      columns={[
        {
          title: "장/국/본장",
          width: 130,
          render: (round: Round) => (
            <>
              {translateWind(round.ba, 4)}
              {round.kyoku}국 {round.honba}
              본장{" "}
              {mode === 3 && (
                <ScoreChecker
                  sum={round.east + round.south + round.west}
                  expected={105000}
                />
              )}
              {mode === 4 && (
                <ScoreChecker
                  sum={round.east + round.south + round.west + round.north}
                  expected={100000}
                />
              )}
            </>
          ),
        },
        {
          title: names[0],
          dataIndex: "east",
          width: 100,
          align: "center",
          render: (value: number, _: Round, index: number) => (
            <Score
              wind="east"
              value={value}
              index={index}
              data={data}
              setData={setData}
            />
          ),
        },
        ...(mode === 3 || mode === 4
          ? [
              {
                title: names[1],
                dataIndex: "south",
                width: 100,
                align: "center" as const,
                render: (value: number, _: Round, index: number) => (
                  <Score
                    wind="south"
                    value={value}
                    index={index}
                    data={data}
                    setData={setData}
                  />
                ),
              },
            ]
          : []),
        {
          title: names[mode === 2 ? 1 : 2],
          dataIndex: "west",
          width: 100,
          align: "center",
          render: (value: number, _: Round, index: number) => (
            <Score
              wind="west"
              value={value}
              index={index}
              data={data}
              setData={setData}
            />
          ),
        },
        ...(mode === 4
          ? [
              {
                title: names[3],
                dataIndex: "north",
                width: 100,
                align: "center" as const,
                render: (value: number, _: Round, index: number) => (
                  <Score
                    wind="north"
                    value={value}
                    index={index}
                    data={data}
                    setData={setData}
                  />
                ),
              },
            ]
          : []),
        {
          title: "화료",
          width: 100,
          align: "center",
          dataIndex: "agari",
          render: (agari: Round["agari"]) =>
            agari.length !== mode && agari.length > 0
              ? agari.flatMap((a, index) => [
                  index > 0 ? <br /> : "",
                  translateWind(a, mode, names),
                ])
              : "-",
        },
        {
          title: "형태",
          width: 100,
          align: "center",
          dataIndex: "type",
          render: (type: Round["type"], round: Round) =>
            (type === "ron"
              ? ["", "", "더블 ", "트리플 "][round.agari.length]
              : "") + translateType(type),
        },
        {
          title: "방총",
          width: 100,
          align: "center",
          render: (round: Round) =>
            round.houjuu ? translateWind(round.houjuu, mode, names) : "-",
        },
        {
          title: "부판",
          width: 140,
          align: "center",
          render: (round: Round) =>
            round.type === "ryuukyoku"
              ? !round.ryuukyokuType || round.ryuukyokuType === "ryuukyoku"
                ? round.agari.length !== mode && round.agari.length > 0
                  ? round.agari.flatMap((_, index) => [
                      index > 0 ? <br /> : "",
                      round.han[index] === -1 ? "만관" : "-",
                    ])
                  : "-"
                : ryuukyokuTypes.find((r) => r.value === round.ryuukyokuType)
                    ?.label ?? "-"
              : round.agari.flatMap((_, index) =>
                  round.han[index] >= 13
                    ? [
                        index > 0 ? <br /> : "",
                        round.kazoe?.[index]
                          ? " 헤아림 역만"
                          : round.han[index] === 13
                          ? " 역만"
                          : " " + Math.floor(round.han[index] / 13) + "배 역만",
                      ]
                    : round.han[index] > 4
                    ? [index > 0 ? <br /> : "", round.han[index] + "판"]
                    : [
                        index > 0 ? <br /> : "",
                        round.fu[index] + "부 " + round.han[index] + "판",
                      ]
                ),
        },
        {
          title: "패",
          dataIndex: "hai",
          render: (hai: string[]) => (
            <Space direction="vertical">
              {hai.map((h, i) => (
                <Space key={h + i} direction="horizontal">
                  {h
                    .split("|")
                    .filter(Boolean)
                    .map((hh, i) => (
                      <Mahgen key={hh + i} sequence={hh} size="small" />
                    ))}
                </Space>
              ))}
            </Space>
          ),
        },
        {
          title: "삭제",
          align: "center",
          render: (_, __, index) => (
            <Button
              type="link"
              onClick={() => {
                const newData = [...data];
                newData.splice(index, 1);
                setData(newData);
              }}
            >
              삭제
            </Button>
          ),
        },
      ]}
      rowKey={(round, index) => round.ba + round.kyoku + round.honba + index}
    />
  );
};

export default RoundTable;
