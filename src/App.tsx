import { useState } from "react";
import Mahgen from "./components/Mahgen";
import MahjongInput from "./components/MahjongInput";
import { Card, Table } from "antd";
import NameEdit from "./components/NameEdit";

interface Round {
  ba: "east" | "south" | "west" | "north";
  kyoku: number;
  honba: number;
  east: number;
  south: number;
  west: number;
  north: number;
  agari: ("east" | "south" | "west" | "north" | "none")[];
  type: "tsumo" | "ron" | "ryuukyoku";
  fu: number;
  han: number;
  hai: [string, string, string];
}

function App() {
  const [value, setValue] = useState("123m789m7z|_046m111^1z|7z");
  const [names, setNames] = useState<[string, string, string, string]>(["", "", "", ""]);

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
        dataSource={data}
        columns={[
          {
            title: "장",
            dataIndex: "ba",
            width: 30,
          },
          {
            title: "국",
            dataIndex: "kyoku",
            width: 30,
          },
          {
            title: "본장",
            dataIndex: "honba",
            width: 60,
          },
          {
            title: "東",
            dataIndex: "east",
          },
          {
            title: "南",
            dataIndex: "south",
          },
          {
            title: "西",
            dataIndex: "west",
          },
          {
            title: "北",
            dataIndex: "north",
          },
          {
            title: "화료",
            dataIndex: "agari",
          },
          {
            title: "유형",
            dataIndex: "type",
            width: 60,
          },
          {
            title: "부",
            dataIndex: "fu",
            width: 30,
          },
          {
            title: "판",
            dataIndex: "han",
            width: 30,
          },
          {
            title: "패",
            dataIndex: "hai",
            render: (hai: [string, string, string]) => (
              <Mahgen sequence={hai.join("|")} />
            ),
          },
        ]}
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
