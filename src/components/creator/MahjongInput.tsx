import { FC, useCallback, useEffect, useState } from "react";
import { Form, Input, Space } from "antd";
import Mahgen from "../Mahgen";
import MahjongKeyboard from "./MahjongKeyboard";

interface MahjongInputProps {
  value: string;
  onChange: (value: string) => void;
}

const MahjongInput: FC<MahjongInputProps> = ({ value, onChange }) => {
  const [menzenStr, furoStr, agariStr] = (value ?? "").split("|");

  const [menzen, setMenzen] = useState(menzenStr ?? "");
  const [furo, setFuro] = useState(furoStr ?? "");
  const [agari, setAgari] = useState(agariStr ?? "");

  const [focus, setFocus] = useState<"menzen" | "furo" | "agari">();

  useEffect(() => {
    `${menzenStr}|${furoStr}|${agariStr}` !== `${menzen}|${furo}|${agari}` &&
      onChange(`${menzen}|${furo}|${agari}`);
  }, [menzen, furo, agari, onChange, menzenStr, furoStr, agariStr]);

  const onInput = useCallback(
    (tile: string) => {
      if (focus === "menzen") setMenzen((prev) => prev + tile);
      if (focus === "furo") setFuro((prev) => prev + tile);
      if (focus === "agari") setAgari((prev) => prev + tile);
    },
    [focus]
  );

  const onDelete = useCallback(() => {
    if (focus === "menzen") setMenzen((prev) => prev.slice(0, -2));
    if (focus === "furo") setFuro((prev) => prev.slice(0, -2));
    if (focus === "agari") setAgari((prev) => prev.slice(0, -2));
  }, [focus]);

  return (
    <Space direction="vertical">
      <Form layout="inline">
        <Form.Item label="멘젠">
          <Input
            value={menzen}
            onChange={(e) => setMenzen(e.target.value)}
            onFocus={() => setFocus("menzen")}
            onBlur={(e) => e.relatedTarget === null && e.target.focus()}
            allowClear
            style={{ width: 380 }}
          />
        </Form.Item>
        <Form.Item label="후로">
          <Input
            value={furo}
            onChange={(e) => setFuro(e.target.value)}
            onFocus={() => setFocus("furo")}
            onBlur={(e) => e.relatedTarget === null && e.target.focus()}
            allowClear
            style={{ width: 380 }}
          />
        </Form.Item>
        <Form.Item label="오름패">
          <Input
            value={agari}
            onChange={(e) => setAgari(e.target.value)}
            onFocus={() => setFocus("agari")}
            onBlur={(e) => e.relatedTarget === null && e.target.focus()}
            allowClear
            style={{ width: 65 }}
          />
        </Form.Item>
      </Form>

      {!value || value === "||" ? (
        <Space direction="horizontal">
          <Mahgen sequence="0000000000000z" />
          <Mahgen sequence="0z" />
        </Space>
      ) : (
        <Space direction="horizontal">
          {value
            .split("|")
            .map((hh, i) =>
              hh || i === 2 ? (
                <Mahgen key={hh + i} sequence={hh || "0z"} />
              ) : undefined
            )
            .filter(Boolean)}
        </Space>
      )}
      <MahjongKeyboard onInput={onInput} onDelete={onDelete} />
    </Space>
  );
};

export default MahjongInput;
