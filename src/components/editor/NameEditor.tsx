import { FC } from "react";
import { Descriptions, Typography } from "antd";

import { useAtom, useAtomValue } from 'jotai'
import { Names } from "../../types/names";
import modeAtom from '../../store/atoms/mode'
import namesAtom from '../../store/atoms/names'

const labels = {
  4: ["東", "南", "西", "北"],
  3: ["東", "南", "西"],
  2: ["東", "西"],
};

const NameEditor: FC = () => {
  const mode = useAtomValue(modeAtom)
  const [names, setNames] = useAtom(namesAtom)

  return (
    <Descriptions
      style={{ width: '500px' }}
      column={4}
      items={labels[mode].map((label, index) => ({
        label,
        children: (
          <Typography.Text
            editable={{
              maxLength: 6,
              text: names[index],
              onChange: (text) =>
                setNames(names.map((v, i) => (i === index ? text : v)) as Names)
            }}
          >
            {names[index]}
          </Typography.Text>
        )
      }))}
    />
  )
};

export default NameEditor
