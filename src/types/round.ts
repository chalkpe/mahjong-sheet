export type Wind = "east" | "south" | "west" | "north";

export type AgariType = "tsumo" | "ron" | "ryuukyoku";

export type RyuukyokuType =
  | "ryuukyoku"
  | "kyuushuukyuuhai"
  | "suufonrenda"
  | "suuchariichi"
  | "suukaikan";

export interface Round {
  ba: Wind;
  kyoku: number;
  honba: number;
  east: number;
  south: number;
  west: number;
  north: number;
  agari: Wind[];
  houjuu?: Wind;
  type: AgariType;
  ryuukyokuType?: RyuukyokuType;
  fu: number[];
  han: number[];
  kazoe?: boolean[];
  hai: string[];
}

export const winds = {
  4: ["east", "south", "west", "north"],
  3: ["east", "south", "west"],
  2: ["east", "west"],
};

export const ryuukyokuTypes: { label: string; value: RyuukyokuType }[] = [
  { label: "황패유국", value: "ryuukyoku" },
  { label: "구종구패", value: "kyuushuukyuuhai" },
  { label: "사풍연타", value: "suufonrenda" },
  { label: "사가리치", value: "suuchariichi" },
  { label: "사개깡", value: "suukaikan" },
];

export const translateWind = (
  wind: Wind,
  mode: 2 | 3 | 4,
  names = ["동", "남", "서", "북"]
) => names[winds[mode].indexOf(wind)];

export const translateType = (type: AgariType) =>
  type === "tsumo" ? "쯔모" : type === "ron" ? "론" : "유국";
