import { Checkbox, Form, InputNumber, Space } from "antd";
import { Dispatch, FC, SetStateAction } from "react";

interface FuHanInputProps {
  index: number;
  fu: number[];
  setFu: Dispatch<SetStateAction<number[]>>;
  han: number[];
  setHan: Dispatch<SetStateAction<number[]>>;
  kazoe: boolean[];
  setKazoe: Dispatch<SetStateAction<boolean[]>>;
}

const FuHanInput: FC<FuHanInputProps> = ({
  index,
  fu,
  setFu,
  han,
  setHan,
  kazoe,
  setKazoe,
}) => {
  return (
    <Form.Item label="부판">
      <Space>
        {(!han[index] || han[index] <= 4) && (
          <InputNumber
            value={fu[index]}
            onChange={(v) => {
              if (v === null) return;
              const newFu = [...fu];
              newFu[index] = v;
              setFu(newFu);
            }}
            min={20}
            step={5}
            suffix="부"
          />
        )}
        <InputNumber
          value={han[index]}
          onChange={(v) => {
            if (v === null) return;
            const newHan = [...han];
            newHan[index] = v;
            setHan(newHan);
          }}
          min={1}
          suffix="판"
        />
        {han[index] >= 13 && (
          <>
            <Checkbox
              checked={kazoe[index]}
              onChange={(e) => {
                const newKazoe = [...kazoe];
                newKazoe[index] = e.target.checked;
                setKazoe(newKazoe);
              }}
            >
              헤아림 역만?
            </Checkbox>
          </>
        )}
      </Space>
    </Form.Item>
  );
};

export default FuHanInput;
