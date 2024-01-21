import { FC, useMemo } from "react";
import { Table, Typography } from "antd";

import { UmaMode } from "../types/mode";
import { Names } from "../types/names";
import { Round } from "../types/round";
import { windsForMode } from "../types/wind";

const uma = {
  3: [15, 0, -15],
  4: [15, 5, -5, -15],
};

const renderScore = (score: number) =>
  (score > 0 ? "+" : "") + score.toFixed(1);

interface UmaTableProps {
  mode: UmaMode;
  round: Round;
  names: Names;
}

const UmaTable: FC<UmaTableProps> = ({ mode, round, names }) => {
  const base = useMemo(
    () =>
      mode === 3
        ? [
            { wind: "east", score: round.east },
            { wind: "south", score: round.south },
            { wind: "west", score: round.west },
          ]
        : [
            { wind: "east", score: round.east },
            { wind: "south", score: round.south },
            { wind: "west", score: round.west },
            { wind: "north", score: round.north },
          ],
    [mode, round.east, round.south, round.west, round.north]
  );

  const scores = useMemo(
    () =>
      base.reduce((sum, s) => sum + s.score, 0) ===
        (mode === 3 ? 105000 : 100000) &&
      base
        .sort(
          (a, b) =>
            b.score - a.score ||
            windsForMode[mode].indexOf(a.wind) -
              windsForMode[mode].indexOf(b.wind)
        )
        .map((s, i) => ({
          wind: s.wind,
          rank: i + 1,
          score: (s.score - (mode === 3 ? 35000 : 25000)) / 1000 + uma[mode][i],
        }))
        .sort(
          (a, b) =>
            windsForMode[mode].indexOf(a.wind) -
            windsForMode[mode].indexOf(b.wind)
        ),
    [base, mode]
  );

  return scores ? (
    <Table
      style={{ width: "fit-content" }}
      bordered
      pagination={false}
      columns={[
        {
          title: "",
          dataIndex: "title",
          width: 130,
          render: (title: string) => (
            <Typography.Text strong>{title}</Typography.Text>
          ),
        },
        {
          title: names[0],
          dataIndex: "east",
          width: 100,
        },
        {
          title: names[1],
          dataIndex: "south",
          width: 100,
        },

        {
          title: names[2],
          dataIndex: "west",
          width: 100,
        },
        ...(mode === 4
          ? [
              {
                title: names[3],
                dataIndex: "north",
                width: 100,
              },
            ]
          : []),
      ]}
      dataSource={[
        {
          title: "총점",
          east: renderScore(scores[0].score),
          south: renderScore(scores[1].score),
          west: renderScore(scores[2].score),
          north: renderScore(scores[3]?.score ?? 0),
        },

        {
          title: "순위",
          east: scores[0].rank,
          south: scores[1].rank,
          west: scores[2].rank,
          north: scores[3]?.rank,
        },
      ]}
    />
  ) : null;
};

export default UmaTable;
