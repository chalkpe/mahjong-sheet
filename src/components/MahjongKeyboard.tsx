import { FC } from "react";
import { Button, Card, Flex, Space } from "antd";
import Mahgen from "./Mahgen";
import { ArrowLeftOutlined } from "@ant-design/icons";

const layout = [
  ["1m", "2m", "3m", "4m", "5m", "0m", "6m", "7m", "8m", "9m"],
  ["1p", "2p", "3p", "4p", "5p", "0p", "6p", "7p", "8p", "9p"],
  ["1s", "2s", "3s", "4s", "5s", "0s", "6s", "7s", "8s", "9s"],
  ["1z", "2z", "3z", "4z", "5z", "6z", "7z", "0z"],
];

interface MahjongKeyboardProps {
  onInput: (tile: string) => void;
  onDelete: () => void;
}

const MahjongKeyboard: FC<MahjongKeyboardProps> = ({ onInput, onDelete }) => {
  return (
    <Card
      title="마작패 키보드"
      extra={
        <Button
          icon={<ArrowLeftOutlined />}
          onClick={() => onDelete()}
          onFocus={(e) => {
            e.target.blur()
            if (e.relatedTarget instanceof HTMLElement) e.relatedTarget.focus()
          }}
        />
      }
      style={{ width: "fit-content" }}
    >
      <Flex vertical>
        {layout.map((line) => (
          <Space>
            {line.map((tile) => (
              <article onClick={() => onInput(tile)}>
                <Mahgen sequence={tile} size="small" />
              </article>
            ))}
          </Space>
        ))}
      </Flex>
    </Card>
  );
};

export default MahjongKeyboard;
