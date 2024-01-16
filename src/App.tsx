import "./App.css";

import { Button, Card, Form, Segmented, Space } from "antd";
import { GithubOutlined } from "@ant-design/icons";
import useLocalStorage from "use-local-storage";

import NameEdit from "./components/NameEdit";
import UmaTable from "./components/UmaTable";
import RoundTable from "./components/RoundTable";
import RoundCreator from "./components/RoundCreator";

import { Round } from "./types/round";

function App() {
  const [mode, setMode] = useLocalStorage<2 | 3 | 4>("mode", 4);

  const [names, setNames] = useLocalStorage<[string, string, string, string]>(
    "names",
    ["동가", "남가", "서가", "북가"]
  );

  const [data, setData] = useLocalStorage<Round[]>("data", []);

  return (
    <Space direction="vertical">
      <Card
        title="기본 설정"
        extra={
          <Button
            icon={<GithubOutlined />}
            onClick={() =>
              open("https://github.com/chalkpe/mahjong-sheet", "_blank")
            }
          />
        }
      >
        <Form>
          <Form.Item label="모드">
            <Segmented
              options={["2인", "3인", "4인"]}
              value={mode + "인"}
              onChange={(v) => setMode(parseInt(v.toString()[0]) as 2 | 3 | 4)}
            />
          </Form.Item>
          <Form.Item label="닉네임">
            <NameEdit mode={mode} value={names} onChange={setNames} />
          </Form.Item>
        </Form>
      </Card>
      <Card>
        <Space direction="vertical" size="large">
          <RoundTable mode={mode} data={data} setData={setData} names={names} />
          {mode !== 2 && data.length > 0 && (
            <UmaTable mode={mode} round={data[data.length - 1]} names={names} />
          )}
        </Space>
      </Card>
      <RoundCreator
        mode={mode}
        names={names}
        lastRound={data.length ? data[data.length - 1] : undefined}
        onCreated={(round) => setData([...data, round])}
      />
    </Space>
  );
}

export default App;
