import { Table } from "antd";
import Mahgen from "./Mahgen";
import { Round, translateType, translateWind } from "../types/round";
import { FC } from "react";

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
          width: 120,
          render: (round: Round) =>
            translateWind(round.ba, mode) +
            round.kyoku +
            "국 " +
            round.honba +
            "본장",
        },
        {
          title: `東 (${names[0]})`,
          dataIndex: "east",
          width: 100,
        },
        ...(mode === 3 || mode === 4
          ? [
              {
                title: `南 (${names[1]})`,
                dataIndex: "south",
                width: 100,
              },
            ]
          : []),
        {
          title: `西 (${names[mode === 2 ? 1 : 2]})`,
          dataIndex: "west",
          width: 100,
        },
        ...(mode === 4
          ? [
              {
                title: `北 (${names[3]})`,
                dataIndex: "north",
                width: 100,
              },
            ]
          : []),
        {
          title: "화료",
          width: 100,
          render: (round: Round) =>
            round.agari
              .map((a) =>
                a === "none" ? "노텐" : translateWind(a, mode, names)
              )
              .join(", ") +
            " " +
            translateType(round.type),
        },
        {
          title: "부판",
          width: 100,
          render: (round: Round) => round.han > 4 ? round.han + "판" : round.fu + "부 " + round.han + "판",
        },
        {
          title: "패",
          dataIndex: "hai",
          render: (hai: string) => <Mahgen sequence={hai} size="small" />,
        },
        {
          title: "삭제",
          render: (_, __, index) => 
            <button
              onClick={() => {
                const newData = [...data];
                newData.splice(index, 1);
                setData(newData);
              }}
            >
              삭제
            </button>
          ,
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
