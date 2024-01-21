import { FC, useCallback, useMemo, useState } from "react";
import { Button, Card, Form, Space } from "antd";

import AgariCard from "./creator/AgariCard";
import BaSelect from "./creator/BaSelect";
import TypeSelect from "./creator/TypeSelect";

import { AgariType, RyuukyokuType } from "../types/agari";
import { Mode } from "../types/mode";
import { Names } from "../types/names";
import { Round } from "../types/round";
import { Wind } from "../types/wind";

interface RoundCreatorProps {
  mode: Mode;
  names: Names;
  lastRound?: Round;
  onCreated: (round: Round) => void;
}

const RoundCreator: FC<RoundCreatorProps> = ({
  mode,
  names,
  lastRound,
  onCreated,
}) => {
  const [ba, setBa] = useState<Wind>("east");
  const [kyoku, setKyoku] = useState(1);
  const [honba, setHonba] = useState(0);
  const [type, setType] = useState<AgariType>("tsumo");
  const [ryuukyokuType, setRyuukyokuType] = useState<RyuukyokuType>();
  const [agari, setAgari] = useState<Wind[]>([]);
  const [houjuu, setHoujuu] = useState<Wind>();
  const [fu, setFu] = useState<number[]>([]);
  const [han, setHan] = useState<number[]>([]);
  const [kazoe, setKazoe] = useState<boolean[]>([]);
  const [hai, setHai] = useState<string[]>([]);

  const disabled = useMemo(
    () =>
      (type === "ryuukyoku"
        ? false
        : type === "tsumo"
        ? agari.length === 0
        : houjuu === undefined || agari.length === 0) ||
      (type !== "ryuukyoku" &&
        [...Array(agari.length).keys()].some(
          (i) =>
            !han[i] || (han[i] <= 4 && !fu[i]) || !hai[i] || hai[i] === "||"
        )),
    [agari.length, fu, hai, han, houjuu, type]
  );

  const reset = useCallback(() => {
    setType("tsumo");
    setRyuukyokuType(undefined);
    setAgari([]);
    setHoujuu(undefined);
    setFu([]);
    setHan([]);
    setHai([]);
  }, []);

  const create = useCallback(() => {
    onCreated({
      ba,
      kyoku,
      honba,
      type,
      ryuukyokuType,
      agari,
      houjuu,
      fu,
      han,
      kazoe,
      hai,
      east: lastRound?.east ?? 0,
      south: lastRound?.south ?? 0,
      west: lastRound?.west ?? 0,
      north: lastRound?.north ?? 0,
    });

    reset();
  }, [
    onCreated,
    ba,
    kyoku,
    honba,
    type,
    ryuukyokuType,
    agari,
    houjuu,
    fu,
    han,
    kazoe,
    hai,
    lastRound?.east,
    lastRound?.south,
    lastRound?.west,
    lastRound?.north,
    reset,
  ]);

  return (
    <Card
      title="생성하기"
      extra={
        <Button disabled={disabled} onClick={create}>
          생성
        </Button>
      }
    >
      <Space direction="vertical">
        <Form.Item label="장/국/본장">
          <BaSelect
            mode={mode}
            ba={ba}
            setBa={setBa}
            kyoku={kyoku}
            setKyoku={setKyoku}
            honba={honba}
            setHonba={setHonba}
          />
        </Form.Item>

        <Form.Item label="화료 유형">
          <TypeSelect
            mode={mode}
            names={names}
            type={type}
            setType={setType}
            ryuukyokuType={ryuukyokuType}
            setRyuukyokuType={setRyuukyokuType}
            agari={agari}
            setAgari={setAgari}
            houjuu={houjuu}
            setHoujuu={setHoujuu}
            setFu={setFu}
            setHan={setHan}
            setHai={setHai}
          />
        </Form.Item>

        <AgariCard
          mode={mode}
          names={names}
          type={type}
          ryuukyokuType={ryuukyokuType}
          agari={agari}
          fu={fu}
          setFu={setFu}
          han={han}
          setHan={setHan}
          kazoe={kazoe}
          setKazoe={setKazoe}
          hai={hai}
          setHai={setHai}
        />
      </Space>
    </Card>
  );
};

export default RoundCreator;
