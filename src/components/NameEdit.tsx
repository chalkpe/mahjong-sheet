import { FC } from "react";
import { Descriptions, Typography } from "antd";

import { Mode } from "../types/mode";
import { Names } from "../types/names";

const labels = {
  4: ["東", "南", "西", "北"],
  3: ["東", "南", "西"],
  2: ["東", "西"],
};

interface NameEditProps {
  mode: Mode;
  value: Names;
  onChange: (value: Names) => void;
}

const NameEdit: FC<NameEditProps> = ({ mode, value, onChange }) => {
  return (
    <Descriptions
      style={{ width: "500px" }}
      column={4}
      items={labels[mode].map((label, index) => ({
        label,
        children: (
          <Typography.Text
            editable={{
              maxLength: 6,
              text: value[index],
              onChange: (text) =>
                onChange(
                  value.map((v, i) => (i === index ? text : v)) as Names
                ),
            }}
          >
            {value[index]}
          </Typography.Text>
        ),
      }))}
    />
  );
};

export default NameEdit;
