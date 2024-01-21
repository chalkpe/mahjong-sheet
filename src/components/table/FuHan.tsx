import { FC } from "react";

import { ryuukyokuTypeOptions } from "../../types/agari";
import { Mode } from "../../types/mode";
import { Round } from "../../types/round";

const getName = (fu: number, han: number) => {
  if (han >= 13) return " 역만";
  if (han === 11 || han === 12) return " 삼배만";
  if (han === 8 || han === 9 || han === 10) return " 배만";
  if (han === 6 || han === 7) return " 하네만";
  if (han === 5) return " 만관";
  if (han === 4 && fu >= 40) return " 만관";
  if (han === 3 && fu >= 70) return " 만관";
  return "";
};

interface FuHanProps {
  mode: Mode;
  round: Round;
}

const FuHan: FC<FuHanProps> = ({ mode, round }) => {
  if (round.type === "ryuukyoku") {
    return !round.ryuukyokuType || round.ryuukyokuType === "ryuukyoku"
      ? round.agari.length !== mode && round.agari.length > 0
        ? round.agari.flatMap((_, index) => [
            index > 0 ? <br /> : "",
            round.han[index] === -1 ? "만관" : "-",
          ])
        : "-"
      : ryuukyokuTypeOptions.find((r) => r.value === round.ryuukyokuType)
          ?.label ?? "-";
  }

  return round.agari.flatMap((_, index) =>
    round.han[index] >= 13
      ? [
          index > 0 ? <br /> : "",
          round.kazoe?.[index] ? (
            <strong> 헤아림 역만</strong>
          ) : round.han[index] === 13 ? (
            <strong> 역만</strong>
          ) : (
            <strong> {Math.floor(round.han[index] / 13)}배 역만</strong>
          ),
        ]
      : round.han[index] > 4
      ? [
          index > 0 ? <br /> : "",
          round.han[index] + "판",
          <strong>{getName(round.fu[index], round.han[index])}</strong>,
        ]
      : [
          index > 0 ? <br /> : "",
          round.fu[index] + "부 " + round.han[index] + "판",
          <strong>{getName(round.fu[index], round.han[index])}</strong>,
        ]
  );
};

export default FuHan;
