import { Button, Space, Table } from "antd";
import Mahgen from "./Mahgen";
import { Round, translateType, translateWind } from "../types/round";
import { FC } from "react";
import Score from "./Score";
import ScoreChecker from "./ScoreChecker";

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
      dataSource={data}
      columns={[
        {
          title: "장/국/본장",
          width: 130,
          render: (round: Round) => (
            <>
              {translateWind(round.ba, mode)}
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
          title: `東 (${names[0]})`,
          dataIndex: "east",
          width: 100,
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
                title: `南 (${names[1]})`,
                dataIndex: "south",
                width: 100,
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
          title: `西 (${names[mode === 2 ? 1 : 2]})`,
          dataIndex: "west",
          width: 100,
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
                title: `北 (${names[3]})`,
                dataIndex: "north",
                width: 100,
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
          render: (round: Round) =>
            round.agari.flatMap((a, index) =>
              a.length
                ? [index > 0 ? <br /> : "", translateWind(a, mode, names)]
                : ["노텐"]
            ),
        },
        {
          title: "형태",
          width: 100,
          dataIndex: "type",
          render: (type: Round["type"], round: Round) =>
            (type === "ron"
              ? ["", "", "더블 ", "트리플 "][round.agari.length]
              : "") + translateType(type),
        },
        {
          title: "방총",
          width: 100,
          render: (round: Round) =>
            round.houjuu ? translateWind(round.houjuu, mode, names) : "-",
        },
        {
          title: "부판",
          width: 100,
          render: (round: Round) =>
            round.type === "ryuukyoku"
              ? round.agari.flatMap((_, index) => [
                  index > 0 ? <br /> : "",
                  round.han[index] === -1 ? "만관" : "-",
                ])
              : round.agari.flatMap((_, index) =>
                  round.han[index] > 4
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
              {hai.map((h) => (
                <Mahgen sequence={h} size="small" />
              ))}
            </Space>
          ),
        },
        {
          title: "삭제",
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
      // summary={() =>
      //   mode > 2 ? (
      //     <Table.Summary>
      //       <Table.Summary.Row>
      //         <Table.Summary.Cell index={0}>우마</Table.Summary.Cell>
      //         <Table.Summary.Cell index={1}>+15</Table.Summary.Cell>
      //         <Table.Summary.Cell index={2}>+5</Table.Summary.Cell>
      //         <Table.Summary.Cell index={3}>-5</Table.Summary.Cell>
      //         <Table.Summary.Cell index={4}>-15</Table.Summary.Cell>
      //       </Table.Summary.Row>
      //     </Table.Summary>
      //   ) : undefined
      // }
    />
  );
};

export default RoundTable;
