import { useState } from "react";
import Mahgen from "./components/Mahgen";
import MahjongInput from "./components/MahjongInput";
import { Card, Table } from "antd";
import NameEdit from "./components/NameEdit";
import { Round, translateWind, translateType } from "./types/round";

function App() {
  const [value, setValue] = useState("123m789m7z|_046m111^1z|7z");
  const [names, setNames] = useState<[string, string, string, string]>([
    "",
    "",
    "",
    "",
  ]);

  const data: Round[] = [
    {
      ba: "east",
      kyoku: 1,
      honba: 0,
      east: 25000,
      south: 25000,
      west: 25000,
      north: 25000,
      agari: ["east"],
      type: "tsumo",
      fu: 30,
      han: 1,
      hai: ["3456677p66s", "_435s", "2p"],
    },
  ];

  return (
    <Card>
      <NameEdit value={names} onChange={setNames} />

      <Table
        bordered
        dataSource={data}
        columns={[
          {
            title: "장/국/본장",
            width: 120,
            render: (round: Round) =>
              translateWind(round.ba) +
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
          {
            title: `南 (${names[1]})`,
            dataIndex: "south",
            width: 100,
          },
          {
            title: `西 (${names[2]})`,
            dataIndex: "west",
            width: 100,
          },
          {
            title: `北 (${names[3]})`,
            dataIndex: "north",
            width: 100,
          },
          {
            title: "화료",
            width: 100,
            render: (round: Round) =>
              round.agari
                .map((a) => (a === "none" ? "노텐" : translateWind(a, names)))
                .join(", ") +
              " " +
              translateType(round.type),
          },
          {
            title: "부판",
            width: 100,
            render: (round: Round) => round.fu + "부 " + round.han + "판",
          },
          {
            title: "패",
            dataIndex: "hai",
            render: (hai: [string, string, string]) => (
              <Mahgen sequence={hai.join("|")} />
            ),
          },
        ]}
        summary={() => (
          <Table.Summary>
            <Table.Summary.Row>
              <Table.Summary.Cell index={0}>우마</Table.Summary.Cell>
              <Table.Summary.Cell index={1}>+15</Table.Summary.Cell>
              <Table.Summary.Cell index={2}>+5</Table.Summary.Cell>
              <Table.Summary.Cell index={3}>-5</Table.Summary.Cell>
              <Table.Summary.Cell index={4}>-15</Table.Summary.Cell>
            </Table.Summary.Row>
          </Table.Summary>
        )}
      />

      <div className="card">
        <MahjongInput value={value} onChange={setValue} />
        <br />
        <Mahgen sequence={value} showError />
      </div>
    </Card>
  );
}

export default App;
