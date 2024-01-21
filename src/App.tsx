import "./App.css";

import { Button, Card, Form, Segmented, Space, message } from "antd";
import {
  ExportOutlined,
  GithubOutlined,
  ImportOutlined,
} from "@ant-design/icons";
import useLocalStorage from "use-local-storage";

import NameEdit from "./components/NameEdit";
import UmaTable from "./components/UmaTable";
import RoundTable from "./components/RoundTable";
import RoundCreator from "./components/RoundCreator";

import { Mode } from "./types/mode";
import { Round } from "./types/round";
import { Names, defaultNames } from "./types/names";

function App() {
  const [mode, setMode] = useLocalStorage<Mode>("mode", 4);
  const [names, setNames] = useLocalStorage<Names>("names", defaultNames);
  const [data, setData] = useLocalStorage<Round[]>("data", []);

  return (
    <Space direction="vertical">
      <Card
        title="기본 설정"
        extra={
          <Space>
            <Button
              icon={<ImportOutlined />}
              onClick={() => {
                navigator.clipboard.readText().then((text) => {
                  try {
                    const { mode, names, data } = JSON.parse(text);
                    setMode(mode);
                    setNames(names);
                    setData(data);
                    message.success("클립보드에서 데이터를 가져왔습니다.");
                  } catch {
                    message.error("클립보드에 올바른 데이터가 없습니다.");
                  }
                });
              }}
            >
              가져오기
            </Button>

            <Button
              icon={<ExportOutlined />}
              onClick={() => {
                navigator.clipboard.writeText(
                  JSON.stringify({ mode, names, data })
                );
                message.success("클립보드에 데이터를 복사했습니다.");
              }}
            >
              내보내기
            </Button>

            <Button
              icon={<GithubOutlined />}
              onClick={() =>
                open("https://github.com/chalkpe/mahjong-sheet", "_blank")
              }
            />
          </Space>
        }
      >
        <Form>
          <Form.Item label="모드">
            <Segmented
              options={["2인", "3인", "4인"]}
              value={mode + "인"}
              onChange={(v) => setMode(parseInt(v.toString()[0]) as Mode)}
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
