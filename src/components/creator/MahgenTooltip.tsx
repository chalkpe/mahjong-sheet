import { Tooltip, Typography } from "antd";
import { QuestionCircleOutlined } from "@ant-design/icons";
import { FC, PropsWithChildren } from "react";

const MahgenTooltip: FC<PropsWithChildren<unknown>> = ({ children }) => {
  return (
    <>
      {children}
      <Tooltip
        placement="right"
        color="#fff"
        title={
          <Typography>
            <Typography.Paragraph>
              <Typography.Title level={5}>설명</Typography.Title>
              1만~9만은 <Typography.Text code>1m~9m</Typography.Text>, 1통~9통은{" "}
              <Typography.Text code>1p~9p</Typography.Text>, 1삭~9삭은{" "}
              <Typography.Text code>1s~9s</Typography.Text>, 동남서북백발중은{" "}
              <Typography.Text code>1z~7z</Typography.Text>, 적색 5만, 적색 5통
              적색 5삭은 각각 <Typography.Text code>0m, 0p, 0s</Typography.Text>
              로, 뒤집힌 패는 <Typography.Text code>0z</Typography.Text>로
              입력하면 됩니다.
            </Typography.Paragraph>
            <Typography.Paragraph>
              <Typography.Title level={5}>예시</Typography.Title>
              녹일색: <Typography.Text code>22233344488s666z</Typography.Text>
              <br />
              국사무쌍:{" "}
              <Typography.Text code>19m19p19s12345677z</Typography.Text>
            </Typography.Paragraph>
          </Typography>
        }
      >
        <QuestionCircleOutlined />
      </Tooltip>
    </>
  );
}

export default MahgenTooltip;