export type Wind = "east" | "south" | "west" | "north";

export type AgariType = "tsumo" | "ron" | "ryuukyoku";

export interface Round {
  ba: Wind;
  kyoku: number;
  honba: number;
  east: number;
  south: number;
  west: number;
  north: number;
  agari: (Wind | "none")[];
  type: AgariType;
  fu: number;
  han: number;
  hai: [string, string, string];
}

export const translateWind = (wind: Wind, names = ["동", "남", "서", "북"]) =>
  names[["east", "south", "west", "north"].indexOf(wind)];

export const translateType = (type: AgariType) =>
  type === "tsumo" ? "쯔모" : type === "ron" ? "론" : "유국";