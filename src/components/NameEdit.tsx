import { Descriptions, Typography } from "antd";
import { FC } from "react";

const labels = ["東", "南", "西", "北"];

type Names = [string, string, string, string];

interface NameEditProps {
  value: Names;
  onChange: (value: Names) => void;
}

const NameEdit: FC<NameEditProps> = ({ value, onChange }) => {
  return (
    <Descriptions
      style={{ width: '600px' }}
      column={4}
      items={labels.map((label, index) => ({
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
