import { FC, useEffect, useState } from "react";
import { Form, Input } from "antd";

interface MahjongInputProps {
  value: string;
  onChange: (value: string) => void;
}

const MahjongInput: FC<MahjongInputProps> = ({ value, onChange }) => {
  const [menzenStr, furoStr, agariStr] = value.split("|");

  const [menzen, setMenzen] = useState(menzenStr);
  const [furo, setFuro] = useState(furoStr);
  const [agari, setAgari] = useState(agariStr);

  useEffect(() => onChange(`${menzen}|${furo}|${agari}`), [menzen, furo, agari])

  return (
    <Form layout="inline">
      <Form.Item label="멘젠">
        <Input value={menzen} onChange={(e) => setMenzen(e.target.value)} />
      </Form.Item>
      <Form.Item label="후로">
        <Input value={furo} onChange={(e) => setFuro(e.target.value)} />
      </Form.Item>
      <Form.Item label="오름패">
        <Input value={agari} onChange={(e) => setAgari(e.target.value)} />
      </Form.Item>
    </Form>
  );
}

export default MahjongInput;
